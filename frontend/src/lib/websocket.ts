/**
 * WebSocket Client - Fashion AI
 * 
 * Real-time WebSocket connection for notifications, chat, etc.
 */

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/auth-store';

type MessageHandler = (data: any) => void;
type ConnectionHandler = () => void;

interface WebSocketMessage {
  type: string;
  payload: any;
}

class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageHandlers: Map<string, Set<MessageHandler>> = new Map();
  private onConnectHandlers: Set<ConnectionHandler> = new Set();
  private onDisconnectHandlers: Set<ConnectionHandler> = new Set();
  private isManualClose = false;
  private pingInterval: NodeJS.Timeout | null = null;

  constructor(url?: string) {
    this.url = url || process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
  }

  connect(token?: string): void {
    if (typeof window === 'undefined') return;
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.isManualClose = false;
    const wsUrl = token ? `${this.url}?token=${token}` : this.url;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('[WS] Connected');
        this.reconnectAttempts = 0;
        this.startPing();
        this.onConnectHandlers.forEach(handler => handler());
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('[WS] Failed to parse message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('[WS] Disconnected');
        this.stopPing();
        this.onDisconnectHandlers.forEach(handler => handler());
        
        if (!this.isManualClose && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect(token);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[WS] Error:', error);
      };
    } catch (error) {
      console.error('[WS] Failed to connect:', error);
    }
  }

  disconnect(): void {
    this.isManualClose = true;
    this.stopPing();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private scheduleReconnect(token?: string): void {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    console.log(`[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      this.connect(token);
    }, delay);
  }

  private startPing(): void {
    this.pingInterval = setInterval(() => {
      this.send('ping', {});
    }, 30000);
  }

  private stopPing(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    const handlers = this.messageHandlers.get(message.type);
    if (handlers) {
      handlers.forEach(handler => handler(message.payload));
    }

    // Also notify 'all' handlers
    const allHandlers = this.messageHandlers.get('*');
    if (allHandlers) {
      allHandlers.forEach(handler => handler(message));
    }
  }

  send(type: string, payload: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  on(type: string, handler: MessageHandler): () => void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)!.add(handler);

    return () => {
      this.messageHandlers.get(type)?.delete(handler);
    };
  }

  off(type: string, handler: MessageHandler): void {
    this.messageHandlers.get(type)?.delete(handler);
  }

  onConnect(handler: ConnectionHandler): () => void {
    this.onConnectHandlers.add(handler);
    return () => this.onConnectHandlers.delete(handler);
  }

  onDisconnect(handler: ConnectionHandler): () => void {
    this.onDisconnectHandlers.add(handler);
    return () => this.onDisconnectHandlers.delete(handler);
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Singleton instance
export const wsClient = new WebSocketClient();

// React hooks for WebSocket (imports at top of file)

export function useWebSocket() {
  const { accessToken, isAuthenticated } = useAuthStore();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      wsClient.connect(accessToken);
    }

    const unsubConnect = wsClient.onConnect(() => setIsConnected(true));
    const unsubDisconnect = wsClient.onDisconnect(() => setIsConnected(false));

    return () => {
      unsubConnect();
      unsubDisconnect();
    };
  }, [isAuthenticated, accessToken]);

  const subscribe = useCallback((type: string, handler: MessageHandler) => {
    return wsClient.on(type, handler);
  }, []);

  const send = useCallback((type: string, payload: any) => {
    wsClient.send(type, payload);
  }, []);

  return { isConnected, subscribe, send };
}

// Hook for real-time notifications
export function useRealtimeNotifications(onNotification: (notification: any) => void) {
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe('notification', onNotification);
    return unsubscribe;
  }, [subscribe, onNotification]);
}

// Hook for real-time order updates
export function useRealtimeOrderUpdates(orderId: string, onUpdate: (update: any) => void) {
  const { subscribe, send, isConnected } = useWebSocket();

  useEffect(() => {
    if (isConnected && orderId) {
      send('subscribe_order', { orderId });
    }

    const unsubscribe = subscribe(`order_${orderId}`, onUpdate);

    return () => {
      unsubscribe();
      if (isConnected) {
        send('unsubscribe_order', { orderId });
      }
    };
  }, [subscribe, send, isConnected, orderId, onUpdate]);
}

// Hook for real-time chat
export function useRealtimeChat(sessionId: string, onMessage: (message: any) => void) {
  const { subscribe, send, isConnected } = useWebSocket();

  useEffect(() => {
    if (isConnected && sessionId) {
      send('join_chat', { sessionId });
    }

    const unsubscribe = subscribe(`chat_${sessionId}`, onMessage);

    return () => {
      unsubscribe();
      if (isConnected) {
        send('leave_chat', { sessionId });
      }
    };
  }, [subscribe, send, isConnected, sessionId, onMessage]);

  const sendMessage = useCallback((content: string) => {
    send('chat_message', { sessionId, content });
  }, [send, sessionId]);

  return { sendMessage, isConnected };
}

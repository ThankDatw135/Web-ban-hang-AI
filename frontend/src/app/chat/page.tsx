/**
 * Live Chat & AI Support - Fashion AI
 * 
 * Chat trực tiếp với AI với API integration:
 * - AI chatbot interface
 * - Message history
 * - Quick actions
 * - Session management
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Sparkles, 
  Bot, 
  Paperclip,
  MoreVertical,
  Phone,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Plus,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';
import { Header } from '@/components';
import { useAIChat, useChatSessions, useChatSession } from '@/hooks/useAI';
import { useAuthStore } from '@/stores/auth-store';
import { toastError } from '@/stores';
import type { ChatMessage } from '@/types';

// Quick suggestions
const quickSuggestions = [
  'Theo dõi đơn hàng',
  'Tư vấn size',
  'Chính sách đổi trả',
  'Gợi ý outfit',
];

export default function ChatPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [inputValue, setInputValue] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  
  // API hooks
  const sendChat = useAIChat();
  const { data: sessions } = useChatSessions();
  const { data: currentSession } = useChatSession(currentSessionId || '');

  // Sync messages from session
  useEffect(() => {
    if (currentSession?.messages) {
      setLocalMessages(currentSession.messages);
    }
  }, [currentSession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages, sendChat.isPending]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (!isAuthenticated) {
      router.push('/login?redirect=/chat');
      return;
    }

    // Create optimistic user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sessionId: currentSessionId || '',
      role: 'USER',
      content: text,
      createdAt: new Date().toISOString(),
    };
    
    setLocalMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    try {
      const response = await sendChat.mutateAsync({
        sessionId: currentSessionId || undefined,
        message: text,
      });
      
      // Update session ID if new
      if (!currentSessionId) {
        setCurrentSessionId(response.sessionId);
      }
      
      // Add AI response
      setLocalMessages(prev => [...prev, response.message]);
    } catch {
      toastError('Lỗi', 'Không thể gửi tin nhắn');
      // Remove optimistic message on error
      setLocalMessages(prev => prev.filter(m => m.id !== userMessage.id));
    }
  };

  const startNewSession = () => {
    setCurrentSessionId(null);
    setLocalMessages([]);
  };

  const selectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setShowSidebar(false);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full flex">
        {/* Sessions Sidebar */}
        <div className={`${showSidebar ? 'block' : 'hidden'} md:block w-72 bg-white border-r border-border flex-shrink-0`}>
          <div className="p-4 border-b border-border">
            <button
              onClick={startNewSession}
              className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="size-4" />
              Cuộc hội thoại mới
            </button>
          </div>
          
          <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto">
            {sessions?.map((session) => (
              <button
                key={session.id}
                onClick={() => selectSession(session.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentSessionId === session.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-secondary-50 text-text-main'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-4 flex-shrink-0" />
                  <span className="font-medium truncate">{session.title || 'Cuộc hội thoại'}</span>
                </div>
                <p className="text-xs text-text-muted mt-1">
                  {new Date(session.updatedAt).toLocaleDateString('vi-VN')}
                </p>
              </button>
            ))}
            
            {(!sessions || sessions.length === 0) && (
              <p className="text-center text-text-muted text-sm py-4">
                Chưa có cuộc hội thoại nào
              </p>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-3xl">
          {/* Chat Header */}
          <div className="bg-white border-b border-border px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100 transition-colors"
              >
                <ArrowLeft className="size-5 text-text-muted" />
              </button>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Bot className="size-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-text-main">AI Fashion Stylist</h1>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="size-2 bg-green-500 rounded-full animate-pulse" />
                    Online 24/7
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100 transition-colors">
                <Phone className="size-5 text-text-muted" />
              </button>
              <button className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100 transition-colors">
                <MoreVertical className="size-5 text-text-muted" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Welcome message if no messages */}
            {localMessages.length === 0 && (
              <div className="flex items-end gap-2">
                <div className="size-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="size-4 text-white" />
                </div>
                <div className="bg-white border border-border p-4 rounded-2xl rounded-bl-md max-w-[80%]">
                  <p className="text-text-main">
                    Xin chào! Tôi là Fashion AI Stylist 👋 Tôi có thể giúp bạn:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-text-muted">
                    <li>• Tư vấn phong cách và outfit</li>
                    <li>• Gợi ý size phù hợp</li>
                    <li>• Theo dõi đơn hàng</li>
                    <li>• Giải đáp thắc mắc</li>
                  </ul>
                </div>
              </div>
            )}

            {localMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${msg.role === 'USER' ? 'order-1' : ''}`}>
                  <div className="flex items-end gap-2">
                    {msg.role === 'ASSISTANT' && (
                      <div className="size-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                        <Sparkles className="size-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-2xl ${
                        msg.role === 'USER'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-white border border-border rounded-bl-md'
                      }`}
                    >
                      <p className={msg.role === 'USER' ? 'text-white' : 'text-text-main'}>
                        {msg.content}
                      </p>
                      
                      {/* Suggested products */}
                      {msg.metadata?.suggestedProducts && msg.metadata.suggestedProducts.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.metadata.suggestedProducts.map((productId, idx) => (
                            <Link
                              key={idx}
                              href={`/products/${productId}`}
                              className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors"
                            >
                              Xem sản phẩm
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className={`text-xs text-text-muted mt-1 ${msg.role === 'USER' ? 'text-right' : 'ml-10'}`}>
                    {formatTime(msg.createdAt)}
                  </p>
                  {msg.role === 'ASSISTANT' && (
                    <div className="flex items-center gap-2 mt-2 ml-10">
                      <button className="text-xs text-text-muted hover:text-green-600 flex items-center gap-1">
                        <ThumbsUp className="size-3" /> Hữu ích
                      </button>
                      <button className="text-xs text-text-muted hover:text-red-600 flex items-center gap-1">
                        <ThumbsDown className="size-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {sendChat.isPending && (
              <div className="flex items-end gap-2">
                <div className="size-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Sparkles className="size-4 text-white" />
                </div>
                <div className="bg-white border border-border p-4 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="size-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="size-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="size-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto">
            {quickSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(suggestion)}
                disabled={sendChat.isPending}
                className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-main hover:border-primary hover:text-primary transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-border p-4">
            <div className="flex items-center gap-3">
              <button className="size-10 rounded-full bg-secondary-50 flex items-center justify-center hover:bg-secondary-100 transition-colors">
                <Paperclip className="size-5 text-text-muted" />
              </button>
              <button className="size-10 rounded-full bg-secondary-50 flex items-center justify-center hover:bg-secondary-100 transition-colors">
                <ImageIcon className="size-5 text-text-muted" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(inputValue)}
                placeholder="Nhập tin nhắn..."
                disabled={sendChat.isPending}
                className="flex-1 px-4 py-3 bg-secondary-50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || sendChat.isPending}
                className="size-12 rounded-full bg-primary hover:bg-primary/90 disabled:bg-secondary-200 flex items-center justify-center transition-colors"
              >
                {sendChat.isPending ? (
                  <Loader2 className="size-5 text-white animate-spin" />
                ) : (
                  <Send className="size-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

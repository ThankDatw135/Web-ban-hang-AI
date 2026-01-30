/**
 * Live Chat & AI Support Monitor - Fashion AI
 * 
 * Chat trực tiếp với AI/nhân viên:
 * - AI chatbot interface
 * - Message history
 * - Quick actions
 * - Escalate to human
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Image,
  Paperclip,
  MoreVertical,
  Phone,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react';
import { Header, Footer } from '@/components';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: { label: string; href: string }[];
}

// Initial AI messages
const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: 'Xin chào! Tôi là Fashion AI Concierge. Tôi có thể giúp gì cho bạn hôm nay? 👋',
    timestamp: new Date(),
  },
];

// Quick suggestions
const quickSuggestions = [
  'Theo dõi đơn hàng',
  'Tư vấn size',
  'Chính sách đổi trả',
  'Liên hệ nhân viên',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(text);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('đơn hàng') || lowerMessage.includes('theo dõi')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Để theo dõi đơn hàng, bạn có thể vào mục "Đơn hàng" trong tài khoản hoặc cho tôi biết mã đơn hàng để tôi kiểm tra ngay nhé!',
        timestamp: new Date(),
        actions: [
          { label: 'Xem đơn hàng', href: '/orders' },
        ],
      };
    }
    
    if (lowerMessage.includes('size') || lowerMessage.includes('số đo')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Tôi có thể giúp bạn tìm size phù hợp! Bạn có thể sử dụng tính năng AI Body Scan để đo số đo chính xác, hoặc tham khảo bảng size trong mỗi sản phẩm.',
        timestamp: new Date(),
        actions: [
          { label: 'AI Body Scan', href: '/body-scan' },
          { label: 'Hướng dẫn đo', href: '/size-guide' },
        ],
      };
    }
    
    if (lowerMessage.includes('đổi') || lowerMessage.includes('trả') || lowerMessage.includes('hoàn')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Fashion AI có chính sách đổi trả linh hoạt trong 14 ngày. Sản phẩm cần còn nguyên tag và chưa qua sử dụng. Miễn phí đổi trả cho lý do size không phù hợp!',
        timestamp: new Date(),
        actions: [
          { label: 'Yêu cầu đổi trả', href: '/returns' },
        ],
      };
    }
    
    if (lowerMessage.includes('nhân viên') || lowerMessage.includes('người thật') || lowerMessage.includes('support')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Tôi sẽ kết nối bạn với nhân viên hỗ trợ. Thời gian chờ dự kiến: 2-3 phút. Bạn cũng có thể gọi hotline 1900 1234 56 để được hỗ trợ ngay.',
        timestamp: new Date(),
        actions: [
          { label: 'Gọi hotline', href: 'tel:19001234' },
        ],
      };
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: 'Cảm ơn bạn đã liên hệ! Tôi đang tìm hiểu thêm về yêu cầu của bạn. Bạn có thể cho tôi biết thêm chi tiết được không?',
      timestamp: new Date(),
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-border px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/support" className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100 transition-colors">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Bot className="size-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-text-main">AI Concierge</h1>
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
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : ''}`}>
                <div className="flex items-end gap-2">
                  {msg.type === 'ai' && (
                    <div className="size-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <Sparkles className="size-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-white border border-border rounded-bl-md'
                    }`}
                  >
                    <p className={msg.type === 'user' ? 'text-white' : 'text-text-main'}>
                      {msg.content}
                    </p>
                    {msg.actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.actions.map((action, idx) => (
                          <Link
                            key={idx}
                            href={action.href}
                            className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors"
                          >
                            {action.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className={`text-xs text-text-muted mt-1 ${msg.type === 'user' ? 'text-right' : 'ml-10'}`}>
                  {formatTime(msg.timestamp)}
                </p>
                {msg.type === 'ai' && (
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

          {isTyping && (
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
              className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-main hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
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
              <Image className="size-5 text-text-muted" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-3 bg-secondary-50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="size-12 rounded-full bg-primary hover:bg-primary/90 disabled:bg-secondary-200 flex items-center justify-center transition-colors"
            >
              <Send className="size-5 text-white" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Fashion AI - AI Chat Support Page
 * 
 * Hỗ trợ trực tuyến với AI Stylist
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';
import { useAIChat } from '@/hooks/use-ai';
import { 
  Bot, Send, Plus, Image as ImageIcon, Mic, Sparkles, 
  User, ShoppingBag, Loader2 
} from 'lucide-react';

type MessageRole = 'ai' | 'user';
type AssistantMode = 'ai' | 'human';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  products?: Product[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

// Initial welcome message
const welcomeMessage: Message = {
  id: '1',
  role: 'ai',
  content: 'Chào bạn! Mình là trợ lý thời trang AI của bạn. Dựa trên lịch sử mua hàng, mình thấy bạn yêu thích phong cách thanh lịch. Bạn đang tìm trang phục cho dịp nào sắp tới không?',
  timestamp: new Date(),
};

// Quick action suggestions
const quickActions = [
  'Tìm váy dự tiệc',
  'Gợi ý outfit công sở',
  'Phối đồ theo màu',
  'Tư vấn size phù hợp',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<AssistantMode>('ai');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // AI Chat mutation
  const aiChatMutation = useAIChat();

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    // Call AI API
    aiChatMutation.mutate(
      { message: userInput, sessionId: sessionId || undefined },
      {
        onSuccess: (response) => {
          // Set session ID for subsequent messages
          if (!sessionId) {
            setSessionId(response.id);
          }
          
          const aiResponse: Message = {
            id: response.id || (Date.now() + 1).toString(),
            role: 'ai',
            content: response.content,
            timestamp: new Date(response.createdAt),
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsTyping(false);
        },
        onError: () => {
          // Fallback to mock response when API fails
          setTimeout(() => {
            const aiResponse: Message = {
              id: (Date.now() + 1).toString(),
              role: 'ai',
              content: 'Tuyệt vời! Váy lụa là lựa chọn hoàn hảo cho tiệc tối. Dưới đây là 2 mẫu mới nhất trong bộ sưu tập "Midnight Glamour" phù hợp với dáng người và sở thích của bạn:',
              timestamp: new Date(),
              products: [
                {
                  id: '1',
                  name: 'Váy Lụa Midnight Noir',
                  description: 'Silk Satin cao cấp',
                  price: 5200000,
                  image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
                  badge: 'Best Seller',
                },
                {
                  id: '2',
                  name: 'Đầm Dạ Hội Navy Blue',
                  description: 'Thiết kế hở lưng',
                  price: 4800000,
                  image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400',
                },
              ],
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
          }, 1000);
        },
      }
    );
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <div className="min-h-screen bg-[#151118] text-white flex flex-col overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151118]/80 backdrop-blur-md z-20">
        <Link href="/" className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-accent" />
          <h2 className="text-xl font-bold">Fashion AI</h2>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/products">
            <button className="relative text-white/80 hover:text-white">
              <ShoppingBag className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex justify-center items-center p-4 md:p-8 z-10 overflow-hidden">
        <div className="flex flex-col w-full max-w-[1000px] h-full bg-[#1e1726]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Chat Header */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-white/5 bg-[#151118]/50 gap-4">
            {/* Profile Info */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-900 p-0.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#151118] flex items-center justify-center">
                    <Bot className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#151118] rounded-full" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  Fashion AI Assistant
                  <span className="bg-accent/20 text-accent text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    Online
                  </span>
                </h3>
                <p className="text-white/40 text-sm">Luôn sẵn sàng hỗ trợ phong cách của bạn</p>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex p-1 bg-[#2a2235] rounded-lg w-full md:w-auto shrink-0">
              <button
                onClick={() => setMode('ai')}
                className={cn(
                  'flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all',
                  mode === 'ai' 
                    ? 'bg-[#3b2d4a] text-white shadow-sm border border-accent/30' 
                    : 'text-white/50 hover:text-white/80'
                )}
              >
                <Bot className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Stylist AI</span>
              </button>
              <button
                onClick={() => setMode('human')}
                className={cn(
                  'flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all',
                  mode === 'human' 
                    ? 'bg-[#3b2d4a] text-white shadow-sm border border-accent/30' 
                    : 'text-white/50 hover:text-white/80'
                )}
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Nhân viên</span>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-[#151118]/30">
            {/* Timestamp */}
            <div className="flex justify-center">
              <span className="text-xs font-medium text-white/20 bg-white/5 px-3 py-1 rounded-full">
                Hôm nay
              </span>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-4 max-w-[90%]',
                  message.role === 'user' && 'ml-auto flex-row-reverse'
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1',
                  message.role === 'ai' 
                    ? 'bg-[#2a2235] border border-white/5' 
                    : 'bg-gradient-to-tr from-primary to-primary-600'
                )}>
                  {message.role === 'ai' ? (
                    <Bot className="w-4 h-4 text-accent" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className={cn('flex flex-col gap-1', message.role === 'user' && 'items-end')}>
                  <span className="text-xs text-white/40 ml-1">
                    {message.role === 'ai' ? 'Stylist AI' : 'Bạn'}
                  </span>
                  
                  {/* Message Bubble */}
                  <div className={cn(
                    'p-4 rounded-2xl',
                    message.role === 'ai' 
                      ? 'bg-[#2a2235] rounded-tl-none border border-white/5 text-white/90' 
                      : 'bg-accent rounded-tr-none text-white shadow-[0_4px_15px_rgba(168,85,247,0.3)]'
                  )}>
                    <p className="leading-relaxed">{message.content}</p>
                  </div>

                  {/* Product Cards */}
                  {message.products && (
                    <div className="flex gap-4 mt-3 overflow-x-auto pb-2">
                      {message.products.map((product) => (
                        <div
                          key={product.id}
                          className="shrink-0 w-[200px] bg-[#221c2b] rounded-xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all group"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <div 
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                              style={{ backgroundImage: `url(${product.image})` }}
                            />
                            {product.badge && (
                              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-primary border border-primary/20">
                                {product.badge}
                              </div>
                            )}
                          </div>
                          <div className="p-3 flex flex-col gap-2">
                            <div>
                              <h4 className="text-white font-medium text-sm truncate">{product.name}</h4>
                              <p className="text-white/60 text-xs">{product.description}</p>
                            </div>
                            <span className="text-primary font-bold">{formatCurrency(product.price)}</span>
                            <Link href={`/products/${product.id}`}>
                              <button className="w-full py-2 bg-[#312839] hover:bg-accent text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors">
                                <Sparkles className="w-4 h-4" />
                                Thử đồ ngay
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#2a2235] border border-white/5 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="bg-[#2a2235] px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => handleQuickAction(action)}
                  className="px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-medium hover:bg-accent hover:text-white transition-colors whitespace-nowrap"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-[#1e1726] border-t border-white/5 relative z-20">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-end gap-3 bg-[#151118] p-2 rounded-xl border border-white/10 focus-within:border-accent/50 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all"
            >
              <button type="button" className="p-2 text-white/40 hover:text-accent transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 text-white/40 hover:text-accent transition-colors hidden sm:block">
                <ImageIcon className="w-5 h-5" />
              </button>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 bg-transparent border-none text-white placeholder-white/30 focus:ring-0 resize-none scrollbar-hide text-sm sm:text-base leading-6 py-2"
                placeholder="Nhập tin nhắn để AI tư vấn..."
                rows={1}
              />

              <button type="button" className="p-2 text-white/40 hover:text-accent transition-colors sm:hidden">
                <Mic className="w-5 h-5" />
              </button>
              
              <button
                type="submit"
                className="bg-accent hover:bg-accent/80 text-white rounded-lg p-2 px-4 h-10 flex items-center justify-center transition-colors shadow-lg shadow-accent/20"
              >
                <Send className="w-5 h-5 mr-1" />
                <span className="text-sm font-bold hidden sm:inline">Gửi</span>
              </button>
            </form>
            
            <p className="text-center mt-2 text-[10px] text-white/20">
              Fashion AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng.
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

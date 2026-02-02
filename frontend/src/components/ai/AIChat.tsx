/**
 * Fashion AI - Chat Widget
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Minus } from 'lucide-react';
import { useChat } from '@/hooks/use-ai';

interface Message {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ASSISTANT', content: 'Xin chào! Tôi là trợ lý AI Fashion. Tôi có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  
  const { mutate: sendMessage, isPending } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isPending) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'USER', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    sendMessage({ message: currentInput }, {
      onSuccess: (data: any) => {
         if (data?.messages) {
            const lastMsg = data.messages[data.messages.length - 1]; 
             setMessages(prev => [...prev, {
                 id: lastMsg.id,
                 role: lastMsg.role as any,
                 content: lastMsg.content
             }]);
         }
      },
      onError: () => {
          setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ASSISTANT', content: 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.' }]);
      }
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${isOpen ? 'bg-red-500 rotate-90' : 'bg-primary animate-bounce-slow'}`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 h-[500px] max-h-[80vh] bg-white dark:bg-[#1e1a14] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in">
          <div className="bg-primary p-4 flex items-center justify-between text-white">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold">Fashion AI</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Đang trực tuyến
                    </p>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                 <Minus className="w-5 h-5" />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
             {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                       msg.role === 'USER' 
                       ? 'bg-primary text-white rounded-br-none' 
                       : 'bg-white dark:bg-[#2c2822] border border-gray-100 dark:border-gray-700 rounded-bl-none shadow-sm'
                   }`}>
                       {msg.content}
                   </div>
                </div>
             ))}
             {isPending && (
                 <div className="flex justify-start">
                     <div className="bg-white dark:bg-[#2c2822] border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                         <Loader2 className="w-4 h-4 animate-spin text-primary" />
                         <span className="text-xs text-secondary">Đang soạn tin...</span>
                     </div>
                 </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-[#1e1a14] border-t border-gray-100 dark:border-gray-800">
             <div className="relative">
                 <input 
                   type="text" 
                   value={input}
                   onChange={e => setInput(e.target.value)}
                   placeholder="Hỏi về thời trang, phối đồ..."
                   className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                 />
                 <button 
                   type="submit" 
                   disabled={!input.trim() || isPending}
                   className="absolute right-1.5 top-1.5 p-1.5 bg-primary text-white rounded-full disabled:opacity-50 disabled:bg-gray-400 hover:bg-primary/90 transition-colors"
                 >
                     <Send className="w-4 h-4" />
                 </button>
             </div>
          </form>
        </div>
      )}
    </>
  );
}

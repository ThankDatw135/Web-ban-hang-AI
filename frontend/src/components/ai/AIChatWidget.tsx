'use client';

/**
 * AI Chat Widget - Fashion AI
 * 
 * Floating button với tooltip
 * Mở chat với AI stylist
 */

import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent to-accent-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5" />
                <span className="font-semibold">AI Stylist</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="text-xs text-white/80 mt-1">
              Tôi có thể giúp bạn tìm outfit hoàn hảo!
            </p>
          </div>

          {/* Messages */}
          <div className="h-64 p-4 overflow-y-auto bg-secondary-50">
            <div className="flex gap-2">
              <div className="size-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="size-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
                <p className="text-sm text-text-main">
                  Xin chào! Tôi là AI Stylist của Fashion AI. 👋
                </p>
                <p className="text-sm text-text-main mt-2">
                  Bạn đang tìm kiếm phong cách nào? Tôi có thể gợi ý những outfit phù hợp với bạn!
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: Send message to AI
                setMessage('');
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="input flex-1 py-2 text-sm"
              />
              <button
                type="submit"
                className="btn-accent btn-sm"
                disabled={!message.trim()}
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="group relative">
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-3 w-48 bg-white p-3 rounded-lg shadow-xl 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                          pointer-events-none transform translate-y-2 group-hover:translate-y-0">
            <p className="text-xs text-text-muted leading-tight">
              Xin chào! Tôi là AI stylist. Cần giúp tìm outfit hoàn hảo không?
            </p>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white transform rotate-45" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center size-14 bg-gradient-to-r from-accent to-accent-600 
                     text-white rounded-full shadow-lg ai-glow
                     hover:scale-110 transition-all duration-300"
        >
          {isOpen ? (
            <X className="size-6" />
          ) : (
            <MessageCircle className="size-6" />
          )}
        </button>
      </div>
    </div>
  );
}

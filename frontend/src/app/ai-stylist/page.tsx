/**
 * AI Stylist & Persona Config - Fashion AI
 * 
 * Cấu hình AI Stylist cá nhân:
 * - Chọn phong cách (Minimalist, Classic, Trendy, etc.)
 * - Màu sắc yêu thích
 * - Budget range
 * - Occasions (Work, Casual, Event)
 * - AI Stylist avatar/persona
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Palette, 
  DollarSign, 
  CheckCircle,
  Bot,
  Heart,
  Briefcase,
  Sun,
  PartyPopper,
  Save
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Style options
const styles = [
  { id: 'minimalist', name: 'Minimalist', emoji: '✨', description: 'Đơn giản, tinh tế' },
  { id: 'classic', name: 'Classic', emoji: '👔', description: 'Thanh lịch, trường tồn' },
  { id: 'trendy', name: 'Trendy', emoji: '🎯', description: 'Thời thượng, cập nhật' },
  { id: 'bohemian', name: 'Bohemian', emoji: '🌻', description: 'Tự do, phóng khoáng' },
  { id: 'streetwear', name: 'Streetwear', emoji: '🛹', description: 'Năng động, đường phố' },
  { id: 'romantic', name: 'Romantic', emoji: '🌸', description: 'Nữ tính, lãng mạn' },
];

// Color palettes
const colorPalettes = [
  { id: 'neutral', name: 'Trung tính', colors: ['#1a1a1a', '#6b6b6b', '#f5f5f5', '#d4b896'] },
  { id: 'earth', name: 'Tone đất', colors: ['#5c4033', '#8b6914', '#c7a26a', '#2d4739'] },
  { id: 'pastel', name: 'Pastel', colors: ['#ffb6c1', '#e6e6fa', '#98d8c8', '#fdfd96'] },
  { id: 'bold', name: 'Nổi bật', colors: ['#ff4757', '#3742fa', '#2ed573', '#ffa502'] },
];

// Occasions
const occasions = [
  { id: 'work', name: 'Công sở', icon: Briefcase },
  { id: 'casual', name: 'Hàng ngày', icon: Sun },
  { id: 'event', name: 'Sự kiện', icon: PartyPopper },
  { id: 'date', name: 'Hẹn hò', icon: Heart },
];

// Budget ranges
const budgetRanges = [
  { id: 'budget', name: 'Tiết kiệm', range: '< 1 triệu/món' },
  { id: 'moderate', name: 'Vừa phải', range: '1-3 triệu/món' },
  { id: 'premium', name: 'Cao cấp', range: '3-10 triệu/món' },
  { id: 'luxury', name: 'Sang trọng', range: '> 10 triệu/món' },
];

export default function AIStylistPage() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['minimalist', 'classic']);
  const [selectedPalette, setSelectedPalette] = useState('neutral');
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(['work', 'casual']);
  const [selectedBudget, setSelectedBudget] = useState('moderate');
  const [stylistName, setStylistName] = useState('Aria');

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleOccasion = (id: string) => {
    setSelectedOccasions(prev => 
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-wide uppercase mb-4">
            <Bot className="size-4" />
            AI Stylist
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Tùy Chỉnh AI Stylist
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Cá nhân hóa trợ lý thời trang AI để nhận gợi ý phù hợp với phong cách và nhu cầu của bạn
          </p>
        </div>

        <div className="space-y-10">
          {/* AI Stylist Persona */}
          <section className="bg-white rounded-2xl border border-border p-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="size-20 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white shadow-lg">
                <Bot className="size-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-main">AI Stylist của bạn</h2>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={stylistName}
                    onChange={(e) => setStylistName(e.target.value)}
                    className="text-2xl font-bold text-accent bg-transparent border-b-2 border-accent/30 focus:border-accent focus:outline-none"
                  />
                  <span className="animate-pulse">✨</span>
                </div>
              </div>
            </div>
            <p className="text-text-muted">
              Xin chào! Tôi là {stylistName}, trợ lý thời trang AI của bạn. Hãy cho tôi biết sở thích để tôi có thể gợi ý những outfit hoàn hảo nhất!
            </p>
          </section>

          {/* Style Preferences */}
          <section className="bg-white rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              Phong Cách Yêu Thích
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedStyles.includes(style.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{style.emoji}</span>
                    {selectedStyles.includes(style.id) && (
                      <CheckCircle className="size-5 text-primary" />
                    )}
                  </div>
                  <h3 className="font-bold text-text-main">{style.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{style.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Color Palette */}
          <section className="bg-white rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
              <Palette className="size-5 text-primary" />
              Bảng Màu Yêu Thích
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorPalettes.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => setSelectedPalette(palette.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPalette === palette.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex gap-1 mb-3">
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 h-8 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-text-main">{palette.name}</span>
                    {selectedPalette === palette.id && (
                      <CheckCircle className="size-4 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Occasions */}
          <section className="bg-white rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-text-main mb-6">Dịp Sử Dụng</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {occasions.map((occasion) => {
                const Icon = occasion.icon;
                const isSelected = selectedOccasions.includes(occasion.id);
                return (
                  <button
                    key={occasion.id}
                    onClick={() => toggleOccasion(occasion.id)}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className={`size-8 ${isSelected ? 'text-primary' : 'text-text-muted'}`} />
                    <span className={`font-medium ${isSelected ? 'text-primary' : 'text-text-main'}`}>
                      {occasion.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Budget */}
          <section className="bg-white rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
              <DollarSign className="size-5 text-primary" />
              Ngân Sách
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {budgetRanges.map((budget) => (
                <button
                  key={budget.id}
                  onClick={() => setSelectedBudget(budget.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedBudget === budget.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <h3 className={`font-bold ${selectedBudget === budget.id ? 'text-primary' : 'text-text-main'}`}>
                    {budget.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">{budget.range}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Save Button */}
          <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all">
            <Save className="size-5" />
            Lưu Cấu Hình
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

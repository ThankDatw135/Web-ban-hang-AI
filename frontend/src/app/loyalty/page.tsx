/**
 * Loyalty & Rewards Program - Fashion AI
 * 
 * Chương trình khách hàng thân thiết:
 * - Points balance
 * - Tier status
 * - Rewards catalog
 * - History
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Gift, 
  Star, 
  Crown, 
  Gem,
  ChevronRight,
  Trophy,
  Sparkles,
  ShoppingBag,
  Ticket
} from 'lucide-react';
import { Header, Footer } from '@/components';

// Membership tiers
const tiers = [
  { 
    name: 'Silver', 
    icon: Star, 
    minPoints: 0, 
    color: 'text-gray-400 bg-gray-100',
    benefits: ['Tích 1 điểm / 10.000đ', 'Ưu đãi sinh nhật 10%'],
  },
  { 
    name: 'Gold', 
    icon: Gem, 
    minPoints: 5000, 
    color: 'text-amber-500 bg-amber-50',
    benefits: ['Tích 1.5 điểm / 10.000đ', 'Ưu đãi sinh nhật 15%', 'Free shipping'],
  },
  { 
    name: 'Platinum', 
    icon: Crown, 
    minPoints: 15000, 
    color: 'text-purple-500 bg-purple-50',
    benefits: ['Tích 2 điểm / 10.000đ', 'Ưu đãi sinh nhật 20%', 'Early access', 'VIP Support'],
  },
];

// Rewards catalog
const rewards = [
  { 
    id: '1', 
    name: 'Voucher 100K', 
    points: 500, 
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200',
    category: 'Voucher',
  },
  { 
    id: '2', 
    name: 'Free Shipping', 
    points: 200, 
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200',
    category: 'Shipping',
  },
  { 
    id: '3', 
    name: 'Personal Styling', 
    points: 1500, 
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200',
    category: 'Service',
  },
  { 
    id: '4', 
    name: 'Exclusive Gift', 
    points: 3000, 
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=200',
    category: 'Gift',
  },
];

// Points history
const history = [
  { id: '1', description: 'Mua hàng - ORD-2024001', points: 450, date: '28/01/2024', type: 'earn' },
  { id: '2', description: 'Đổi Voucher 100K', points: -500, date: '25/01/2024', type: 'redeem' },
  { id: '3', description: 'Mua hàng - ORD-2024002', points: 320, date: '20/01/2024', type: 'earn' },
  { id: '4', description: 'Bonus sinh nhật', points: 200, date: '15/01/2024', type: 'bonus' },
];

export default function LoyaltyPage() {
  const [currentPoints] = useState(2750);
  const [currentTier] = useState('Silver');
  const [activeTab, setActiveTab] = useState<'rewards' | 'history'>('rewards');

  const nextTier = tiers.find(t => t.minPoints > currentPoints);
  const pointsToNext = nextTier ? nextTier.minPoints - currentPoints : 0;
  const progressPercent = nextTier 
    ? ((currentPoints - (tiers.find(t => t.name === currentTier)?.minPoints || 0)) / (nextTier.minPoints - (tiers.find(t => t.name === currentTier)?.minPoints || 0))) * 100
    : 100;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-4">
            <Trophy className="size-5" />
            Rewards Program
          </div>
          <h1 className="text-4xl font-bold text-text-main mb-4">
            Chương Trình Thành Viên
          </h1>
        </div>

        {/* Points Card */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 text-white mb-10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 size-40 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/70 text-sm mb-1">Số điểm hiện tại</p>
                <p className="text-5xl font-bold">{currentPoints.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="size-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-lg">{currentTier} Member</span>
                </div>
                {nextTier && (
                  <p className="text-white/70 text-sm">
                    Còn {pointsToNext.toLocaleString()} điểm lên {nextTier.name}
                  </p>
                )}
              </div>
            </div>

            {nextTier && (
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isActive = tier.name === currentTier;
            return (
              <div 
                key={tier.name}
                className={`p-6 rounded-2xl border-2 ${
                  isActive ? 'border-primary bg-primary/5' : 'border-border bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`size-12 rounded-xl ${tier.color} flex items-center justify-center`}>
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main">{tier.name}</h3>
                    <p className="text-sm text-text-muted">{tier.minPoints.toLocaleString()}+ điểm</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-text-muted flex items-center gap-2">
                      <Sparkles className="size-3 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-border mb-6">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === 'rewards' ? 'text-primary' : 'text-text-muted'
            }`}
          >
            Đổi quà
            {activeTab === 'rewards' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === 'history' ? 'text-primary' : 'text-text-muted'
            }`}
          >
            Lịch sử điểm
            {activeTab === 'history' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Rewards Catalog */}
        {activeTab === 'rewards' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-2xl border border-border p-4 hover:shadow-lg transition-shadow">
                <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-secondary-100">
                  <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-text-muted">{reward.category}</span>
                <h3 className="font-bold text-text-main mb-2">{reward.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">{reward.points} điểm</span>
                  <button 
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      currentPoints >= reward.points
                        ? 'bg-primary text-white'
                        : 'bg-secondary-100 text-text-muted cursor-not-allowed'
                    }`}
                    disabled={currentPoints < reward.points}
                  >
                    Đổi
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {history.map((item, idx) => (
              <div 
                key={item.id}
                className={`flex items-center justify-between p-4 ${
                  idx > 0 ? 'border-t border-border' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-xl flex items-center justify-center ${
                    item.type === 'earn' ? 'bg-green-50 text-green-600' :
                    item.type === 'redeem' ? 'bg-red-50 text-red-500' :
                    'bg-amber-50 text-amber-500'
                  }`}>
                    {item.type === 'earn' ? <ShoppingBag className="size-5" /> :
                     item.type === 'redeem' ? <Ticket className="size-5" /> :
                     <Gift className="size-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-text-main">{item.description}</p>
                    <p className="text-sm text-text-muted">{item.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${item.points > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {item.points > 0 ? '+' : ''}{item.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

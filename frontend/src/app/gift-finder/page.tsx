/**
 * AI Concierge Gift Finder - Fashion AI
 * 
 * Tìm quà tặng với AI integration
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Gift, 
  Sparkles, 
  Heart, 
  Users, 
  Baby, 
  User,
  Cake,
  Calendar,
  PartyPopper,
  Star,
  ShoppingBag,
  ChevronRight,
  Wand2,
  Loader2
} from 'lucide-react';
import { Header, Footer } from '@/components';
import { useGiftSuggest } from '@/hooks/useAI';
import { useAddToCart } from '@/hooks/useCart';
import { toastSuccess, toastError } from '@/stores';

// Recipients
const recipients = [
  { id: 'girlfriend', name: 'Bạn gái', icon: Heart, emoji: '💕' },
  { id: 'boyfriend', name: 'Bạn trai', icon: Heart, emoji: '💙' },
  { id: 'mother', name: 'Mẹ', icon: User, emoji: '👩' },
  { id: 'father', name: 'Bố', icon: User, emoji: '👨' },
  { id: 'friend', name: 'Bạn bè', icon: Users, emoji: '🤝' },
  { id: 'baby', name: 'Em bé', icon: Baby, emoji: '👶' },
];

// Occasions
const occasions = [
  { id: 'birthday', name: 'Sinh nhật', icon: Cake, emoji: '🎂' },
  { id: 'valentine', name: 'Valentine', icon: Heart, emoji: '💝' },
  { id: 'christmas', name: 'Giáng sinh', icon: Gift, emoji: '🎄' },
  { id: 'anniversary', name: 'Kỷ niệm', icon: Calendar, emoji: '💍' },
  { id: 'graduation', name: 'Tốt nghiệp', icon: Star, emoji: '🎓' },
  { id: 'other', name: 'Khác', icon: PartyPopper, emoji: '🎉' },
];

interface GiftSuggestion {
  id: string;
  name: string;
  price: number;
  match: number;
  image: string;
  reason: string;
  variantId?: string;
}

export default function GiftFinderPage() {
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [budget, setBudget] = useState(3000000);
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);

  const giftSuggest = useGiftSuggest();
  const addToCart = useAddToCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleFindGifts = async () => {
    if (!selectedRecipient || !selectedOccasion) return;
    
    try {
      const result = await giftSuggest.mutateAsync({
        recipient: selectedRecipient,
        occasion: selectedOccasion,

        budget,
      });
      setSuggestions(result || []);
    } catch {
      toastError('Lỗi', 'Không thể tìm gợi ý. Vui lòng thử lại.');
    }
  };

  const handleAddToCart = async (gift: GiftSuggestion) => {
    if (!gift.variantId) {
      // Redirect to product page if no variant
      window.location.href = `/products/${gift.id}`;
      return;
    }
    try {
      await addToCart.mutateAsync({ productId: gift.id, variantId: gift.variantId, quantity: 1 });
      toastSuccess('Thành công', `Đã thêm ${gift.name} vào giỏ hàng`);
    } catch {
      toastError('Lỗi', 'Không thể thêm vào giỏ hàng');
    }
  };


  const showResults = suggestions.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 text-accent text-sm font-bold tracking-wide mb-4">
            <Gift className="size-5" />
            AI Gift Concierge
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Tìm Quà Hoàn Hảo
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            AI sẽ giúp bạn tìm món quà ý nghĩa nhất cho người thân yêu
          </p>
        </div>

        {!showResults ? (
          <div className="space-y-10">
            {/* Recipient Selection */}
            <section className="bg-white rounded-2xl border border-border p-8">
              <h2 className="text-xl font-bold text-text-main mb-6">
                Bạn muốn tặng quà cho ai?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => setSelectedRecipient(recipient.id)}
                    className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                      selectedRecipient === recipient.id
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-4xl">{recipient.emoji}</span>
                    <span className={`font-bold ${
                      selectedRecipient === recipient.id ? 'text-primary' : 'text-text-main'
                    }`}>
                      {recipient.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Occasion Selection */}
            <section className="bg-white rounded-2xl border border-border p-8">
              <h2 className="text-xl font-bold text-text-main mb-6">
                Dịp đặc biệt nào?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {occasions.map((occasion) => (
                  <button
                    key={occasion.id}
                    onClick={() => setSelectedOccasion(occasion.id)}
                    className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                      selectedOccasion === occasion.id
                        ? 'border-accent bg-accent/5 shadow-lg shadow-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <span className="text-4xl">{occasion.emoji}</span>
                    <span className={`font-bold ${
                      selectedOccasion === occasion.id ? 'text-accent' : 'text-text-main'
                    }`}>
                      {occasion.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Budget Slider */}
            <section className="bg-white rounded-2xl border border-border p-8">
              <h2 className="text-xl font-bold text-text-main mb-6">
                Ngân sách của bạn
              </h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">500.000₫</span>
                  <span className="text-3xl font-bold text-primary">{formatPrice(budget)}</span>
                  <span className="text-text-muted">10.000.000₫</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={10000000}
                  step={100000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-secondary-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </section>

            {/* Find Gifts Button */}
            <button
              onClick={handleFindGifts}
              disabled={!selectedRecipient || !selectedOccasion || giftSuggest.isPending}
              className="w-full py-5 bg-gradient-to-r from-accent to-primary hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all"
            >
              {giftSuggest.isPending ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                <>
                  <Wand2 className="size-6" />
                  Tìm Quà Với AI
                  <Sparkles className="size-5" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Back Button */}
            <button
              onClick={() => setSuggestions([])}
              className="text-primary font-medium flex items-center gap-1 hover:underline"
            >
              ← Thay đổi tiêu chí
            </button>

            {/* AI Message */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 rounded-2xl border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles className="size-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-text-main mb-1">AI Gift Concierge</h3>
                  <p className="text-text-muted">
                    Dựa trên tiêu chí của bạn, tôi đã chọn ra những món quà phù hợp nhất. 
                    Mỗi món đều được đánh giá Match Score dựa trên dịp và người nhận!
                  </p>
                </div>
              </div>
            </div>

            {/* Gift Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.map((gift) => (
                <div
                  key={gift.id}
                  className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative aspect-square bg-secondary-100">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="size-4" />
                      {gift.match}% Match
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-main mb-1">{gift.name}</h3>
                    <p className="text-sm text-text-muted mb-3">{gift.reason}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{formatPrice(gift.price)}</span>
                      <button 
                        onClick={() => handleAddToCart(gift)}
                        disabled={addToCart.isPending}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                      >
                        <ShoppingBag className="size-4" />
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {suggestions.length === 0 && (
              <div className="text-center py-16">
                <Gift className="size-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">Không tìm thấy gợi ý phù hợp. Hãy thử tiêu chí khác!</p>
              </div>
            )}

            {/* Need More Help */}
            <div className="bg-white rounded-2xl border border-border p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-main">Cần thêm gợi ý?</h3>
                <p className="text-sm text-text-muted">Chat với AI Concierge để tìm món quà độc đáo hơn</p>
              </div>
              <Link
                href="/chat"
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent font-bold rounded-lg hover:bg-accent/20 transition-colors"
              >
                Chat Ngay
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

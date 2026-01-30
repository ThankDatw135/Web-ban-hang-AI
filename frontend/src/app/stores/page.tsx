/**
 * Store Locator Page - Fashion AI
 * 
 * Trang tìm cửa hàng với:
 * - Search bar và region filters
 * - Store cards với hình ảnh
 * - Map view (placeholder)
 * - VIP Styling session booking
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, ArrowRight, Plus, Minus, Navigation } from 'lucide-react';
import { Header, Footer } from '@/components';

// Mock store data
const stores = [
  {
    id: '1',
    name: 'Hồ Chí Minh Flagship',
    address: '123 Đồng Khởi, Quận 1',
    city: 'TP. Hồ Chí Minh',
    distance: '0.8 km',
    hours: 'T2 - CN: 10:00 - 21:00',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600',
  },
  {
    id: '2',
    name: 'Hà Nội Central',
    address: '45 Tràng Tiền, Hoàn Kiếm',
    city: 'Hà Nội',
    distance: '1.2 km',
    hours: 'T2 - CN: 10:00 - 21:00',
    status: 'open',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600',
  },
  {
    id: '3',
    name: 'Đà Nẵng Beach',
    address: '78 Bạch Đằng, Hải Châu',
    city: 'Đà Nẵng',
    distance: '450 km',
    hours: 'T2 - T7: 09:00 - 20:00',
    status: 'closed',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600',
  },
];

const regions = ['Tất cả', 'Miền Nam', 'Miền Bắc', 'Miền Trung'];

export default function StoresPage() {
  const [selectedRegion, setSelectedRegion] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar: Store List */}
        <aside className="w-full lg:w-[480px] xl:w-[540px] flex flex-col bg-white border-r border-border h-full z-10 shadow-xl lg:shadow-none overflow-hidden">
          {/* Sidebar Header & Controls */}
          <div className="flex-none px-6 py-6 border-b border-border">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1 text-text-main">
              Hệ Thống Cửa Hàng
            </h1>
            <p className="text-text-muted text-sm mb-6">
              Trải nghiệm luxury tại các cửa hàng Fashion AI.
            </p>

            {/* Search Bar */}
            <div className="relative group mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="size-5 text-text-muted" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo thành phố, quận..."
                className="block w-full pl-11 pr-4 py-3 bg-secondary-50 border-none rounded-lg text-text-main placeholder-text-muted focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
            </div>

            {/* Region Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedRegion === region
                      ? 'bg-text-main text-white'
                      : 'bg-secondary-50 text-text-muted hover:bg-secondary-200'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Store List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {stores.map((store, index) => (
              <div key={store.id}>
                <div className="group flex flex-col gap-4">
                  {/* Store Image */}
                  <div className="relative overflow-hidden rounded-xl aspect-[16/9] w-full bg-secondary-100">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div
                      className={`absolute top-3 right-3 backdrop-blur text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm ${
                        store.status === 'open'
                          ? 'bg-white/90 text-green-700'
                          : 'bg-white/90 text-red-600'
                      }`}
                    >
                      {store.status === 'open' ? 'Đang mở' : 'Đã đóng'}
                    </div>
                  </div>

                  {/* Store Info */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                        {store.name}
                      </h3>
                      <span className="text-sm text-text-muted">{store.distance}</span>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {store.address}
                      <br />
                      {store.city}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-text-muted mt-1">
                      <Clock className="size-4 text-primary" />
                      <span>{store.hours}</span>
                    </div>

                    {/* CTA Button */}
                    <button className="mt-4 w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold uppercase tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn">
                      Đặt Lịch VIP Styling
                      <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {index < stores.length - 1 && <hr className="border-border mt-8" />}
              </div>
            ))}
          </div>
        </aside>

        {/* Map Section */}
        <main className="flex-1 relative hidden lg:block bg-secondary-100">
          {/* Map Background Placeholder */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200"
              alt="Map background"
              className="w-full h-full object-cover opacity-60 grayscale contrast-125"
            />
          </div>

          {/* Map Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
            <button
              className="size-10 bg-white shadow-lg rounded-lg flex items-center justify-center text-text-muted hover:text-primary transition-colors"
              title="Vị trí của tôi"
            >
              <Navigation className="size-5" />
            </button>
            <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
              <button className="size-10 flex items-center justify-center text-text-muted hover:bg-secondary-50 border-b border-border transition-colors">
                <Plus className="size-5" />
              </button>
              <button className="size-10 flex items-center justify-center text-text-muted hover:bg-secondary-50 transition-colors">
                <Minus className="size-5" />
              </button>
            </div>
          </div>

          {/* Map Markers (Simulated) */}
          <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-full flex flex-col items-center group cursor-pointer z-20">
            {/* Info Window */}
            <div className="mb-3 w-64 bg-white rounded-lg shadow-xl p-3">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={stores[0].image}
                    alt={stores[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-sm text-text-main">{stores[0].name}</h4>
                  <p className="text-xs text-text-muted mt-0.5">Mở cửa đến 21:00</p>
                  <span className="text-primary text-xs font-bold mt-1">Xem chi tiết</span>
                </div>
              </div>
            </div>
            {/* Pin Icon */}
            <MapPin className="size-12 text-primary drop-shadow-lg" fill="currentColor" />
          </div>

          {/* Other Markers */}
          <div className="absolute top-[25%] left-[55%] flex flex-col items-center group cursor-pointer z-10 hover:z-20">
            <MapPin className="size-10 text-text-muted hover:text-primary transition-colors drop-shadow-md" />
          </div>
          <div className="absolute top-[60%] left-[75%] flex flex-col items-center group cursor-pointer z-10 hover:z-20">
            <MapPin className="size-10 text-text-muted hover:text-primary transition-colors drop-shadow-md" />
          </div>
        </main>
      </div>
    </div>
  );
}

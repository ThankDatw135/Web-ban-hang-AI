/**
 * Admin Shipping Management - Fashion AI
 */

'use client';

import Link from 'next/link';
import { ArrowLeft, Truck, MapPin, DollarSign, Clock, Plus, Edit, Trash2 } from 'lucide-react';

const shippingMethods = [
  { id: '1', name: 'Giao hàng tiêu chuẩn', price: 30000, time: '3-5 ngày', active: true },
  { id: '2', name: 'Giao hàng nhanh', price: 50000, time: '1-2 ngày', active: true },
  { id: '3', name: 'Giao hàng hỏa tốc', price: 80000, time: 'Trong ngày', active: true },
  { id: '4', name: 'Miễn phí ship', price: 0, time: '3-5 ngày', active: true, condition: 'Đơn từ 500K' },
];

const shippingZones = [
  { id: '1', name: 'Nội thành HCM', fee: 20000 },
  { id: '2', name: 'Ngoại thành HCM', fee: 35000 },
  { id: '3', name: 'Miền Nam', fee: 40000 },
  { id: '4', name: 'Miền Trung', fee: 45000 },
  { id: '5', name: 'Miền Bắc', fee: 50000 },
];

export default function AdminShipping() {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
            <ArrowLeft className="size-5 text-text-muted" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Quản Lý Vận Chuyển</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Shipping Methods */}
        <section className="bg-white rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-main flex items-center gap-2">
              <Truck className="size-5 text-primary" />
              Phương Thức Vận Chuyển
            </h2>
            <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium flex items-center gap-1">
              <Plus className="size-4" />
              Thêm
            </button>
          </div>
          <div className="space-y-3">
            {shippingMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Truck className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-text-main">{method.name}</p>
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {method.time}
                      </span>
                      {method.condition && (
                        <span className="text-green-600">• {method.condition}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-primary">{formatPrice(method.price)}</span>
                  <div className="flex items-center gap-2">
                    <button className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100">
                      <Edit className="size-4" />
                    </button>
                    <button className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Zones */}
        <section className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-main flex items-center gap-2">
              <MapPin className="size-5 text-accent" />
              Khu Vực Giao Hàng
            </h2>
            <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium flex items-center gap-1">
              <Plus className="size-4" />
              Thêm
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Khu vực</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Phí ship</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone) => (
                  <tr key={zone.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-medium text-text-main">{zone.name}</td>
                    <td className="py-3 px-4 text-right font-bold text-primary">{formatPrice(zone.fee)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="size-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100">
                          <Edit className="size-3" />
                        </button>
                        <button className="size-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100">
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

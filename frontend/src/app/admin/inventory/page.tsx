/**
 * Admin Inventory Management - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, AlertTriangle, Package, TrendingDown, Plus, Minus } from 'lucide-react';

const inventory = [
  { id: '1', name: 'Silk Evening Dress - S', sku: 'SED-S-001', stock: 25, reorderLevel: 10, status: 'ok' },
  { id: '2', name: 'Silk Evening Dress - M', sku: 'SED-M-001', stock: 8, reorderLevel: 10, status: 'low' },
  { id: '3', name: 'Cashmere Sweater - L', sku: 'CSW-L-001', stock: 3, reorderLevel: 5, status: 'critical' },
  { id: '4', name: 'Leather Handbag', sku: 'LHB-001', stock: 0, reorderLevel: 5, status: 'outofstock' },
  { id: '5', name: 'Velvet Blazer - M', sku: 'VBZ-M-001', stock: 15, reorderLevel: 8, status: 'ok' },
];

const statusColors: Record<string, string> = {
  ok: 'text-green-600',
  low: 'text-amber-600',
  critical: 'text-orange-600',
  outofstock: 'text-red-600',
};

export default function AdminInventory() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = inventory.filter(i => i.status === 'low' || i.status === 'critical').length;
  const outOfStockCount = inventory.filter(i => i.status === 'outofstock').length;

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
            <ArrowLeft className="size-5 text-text-muted" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Quản Lý Kho Hàng</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Package className="size-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-main">{inventory.length}</p>
              <p className="text-sm text-text-muted">Loại sản phẩm</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <TrendingDown className="size-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{lowStockCount}</p>
              <p className="text-sm text-text-muted">Sắp hết hàng</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="size-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              <p className="text-sm text-text-muted">Hết hàng</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên hoặc SKU..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary-50 border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Sản phẩm</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">SKU</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Tồn kho</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Mức đặt lại</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Điều chỉnh</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="py-4 px-6 font-medium text-text-main">{item.name}</td>
                  <td className="py-4 px-6 text-text-muted">{item.sku}</td>
                  <td className={`py-4 px-6 text-center font-bold ${statusColors[item.status]}`}>{item.stock}</td>
                  <td className="py-4 px-6 text-center text-text-muted">{item.reorderLevel}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100">
                        <Minus className="size-4" />
                      </button>
                      <button className="size-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100">
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

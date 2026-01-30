/**
 * Admin Products Management - Fashion AI
 * 
 * Quản lý sản phẩm:
 * - Products list with search
 * - Add/Edit/Delete products
 * - Category filter
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  Filter
} from 'lucide-react';

// Mock products
const productsData = [
  { id: '1', name: 'Silk Evening Dress', category: 'Váy/Đầm', price: 6000000, stock: 25, status: 'active', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100' },
  { id: '2', name: 'Cashmere Sweater', category: 'Áo', price: 5000000, stock: 18, status: 'active', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100' },
  { id: '3', name: 'Leather Handbag', category: 'Phụ kiện', price: 5000000, stock: 3, status: 'low', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100' },
  { id: '4', name: 'Velvet Blazer', category: 'Áo', price: 4000000, stock: 12, status: 'active', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
  { id: '5', name: 'Wool Coat', category: 'Áo khoác', price: 8500000, stock: 0, status: 'outofstock', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100' },
];

const categories = ['Tất cả', 'Váy/Đầm', 'Áo', 'Quần', 'Áo khoác', 'Phụ kiện'];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-600',
  low: 'bg-amber-100 text-amber-600',
  outofstock: 'bg-red-100 text-red-600',
};

const statusLabels: Record<string, string> = {
  active: 'Còn hàng',
  low: 'Sắp hết',
  outofstock: 'Hết hàng',
};

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Sản Phẩm</h1>
          </div>
          <Link 
            href="/admin/products/new"
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90"
          >
            <Plus className="size-5" />
            Thêm sản phẩm
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng sản phẩm</p>
            <p className="text-2xl font-bold text-text-main">{productsData.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Còn hàng</p>
            <p className="text-2xl font-bold text-green-600">{productsData.filter(p => p.status === 'active').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Sắp hết</p>
            <p className="text-2xl font-bold text-amber-600">{productsData.filter(p => p.status === 'low').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Hết hàng</p>
            <p className="text-2xl font-bold text-red-500">{productsData.filter(p => p.status === 'outofstock').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary-50 border-b border-border">
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Sản phẩm</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Danh mục</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-text-muted">Giá</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Tồn kho</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Trạng thái</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="size-12 rounded-lg object-cover" />
                        <span className="font-medium text-text-main">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-text-muted">{product.category}</td>
                    <td className="py-4 px-6 text-right font-bold text-text-main">{formatPrice(product.price)}</td>
                    <td className="py-4 px-6 text-center text-text-main">{product.stock}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[product.status]}`}>
                        {statusLabels[product.status]}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100">
                          <Eye className="size-4" />
                        </button>
                        <button className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100">
                          <Edit className="size-4" />
                        </button>
                        <button className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Fashion AI - Admin Products Management
 * 
 * Quản lý sản phẩm
 */

'use client';

import { useState, useMemo } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { useProducts } from '@/hooks/use-products';
import { Loader2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  
  // Fetch products from API
  const { data: productsData, isLoading } = useProducts({ search: search || undefined });
  const products = productsData?.data || [];
  const totalCount = productsData?.meta?.total || products.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sản phẩm</h1>
          <p className="text-gray-600">{totalCount} sản phẩm</p>
        </div>
        <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <select className="h-10 px-4 rounded-lg border border-gray-200 bg-white">
          <option>Tất cả danh mục</option>
          <option>Đầm</option>
          <option>Áo</option>
          <option>Quần</option>
        </select>
        <select className="h-10 px-4 rounded-lg border border-gray-200 bg-white">
          <option>Trạng thái</option>
          <option>Còn hàng</option>
          <option>Hết hàng</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-sm">Sản phẩm</th>
              <th className="text-left p-4 font-semibold text-sm">Danh mục</th>
              <th className="text-left p-4 font-semibold text-sm">Giá</th>
              <th className="text-left p-4 font-semibold text-sm">Tồn kho</th>
              <th className="text-left p-4 font-semibold text-sm">Trạng thái</th>
              <th className="text-center p-4 font-semibold text-sm">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                </td>
              </tr>
            ) : products.length > 0 ? products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100"
                      style={{ backgroundImage: `url(${product.images?.[0]?.url || '/placeholder.jpg'})` }}
                    />
                    <span className="font-semibold">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{product.category?.name || 'N/A'}</td>
                <td className="p-4 font-semibold">{formatCurrency(product.price)}</td>
                <td className="p-4">{product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0}</td>
                <td className="p-4">
                  <span className={cn(
                    'px-2 py-1 rounded-full text-xs font-bold',
                    product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}>
                    {product.isActive ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-500">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  Không tìm thấy sản phẩm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

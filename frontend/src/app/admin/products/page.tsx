/**
 * Admin Products Management - Fashion AI
 * 
 * Quản lý sản phẩm với API integration:
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
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useAdminProducts, useDeleteProduct, type AdminProductFilters } from '@/hooks/useAdmin';
import { toastSuccess, toastError } from '@/stores';

const categories = [
  { value: '', label: 'Tất cả' },
  { value: 'dresses', label: 'Váy/Đầm' },
  { value: 'tops', label: 'Áo' },
  { value: 'bottoms', label: 'Quần' },
  { value: 'outerwear', label: 'Áo khoác' },
  { value: 'accessories', label: 'Phụ kiện' },
];

export default function AdminProducts() {
  const [filters, setFilters] = useState<AdminProductFilters>({ page: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading, refetch } = useAdminProducts({ ...filters, search: searchQuery });
  const deleteProduct = useDeleteProduct();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { className: 'bg-red-100 text-red-600', label: 'Hết hàng' };
    if (stock < 10) return { className: 'bg-amber-100 text-amber-600', label: 'Sắp hết' };
    return { className: 'bg-green-100 text-green-600', label: 'Còn hàng' };
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    
    try {
      await deleteProduct.mutateAsync(id);
      toastSuccess('Đã xóa', 'Sản phẩm đã được xóa');
    } catch {
      toastError('Lỗi', 'Không thể xóa sản phẩm');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  };

  // Calculate stats from data
  const products = data?.items || [];
  const totalProducts = data?.meta.total || 0;
  const activeCount = products.filter(p => (p.variants?.reduce((sum, v) => sum + v.stock, 0) || 0) > 10).length;
  const lowCount = products.filter(p => {
    const stock = p.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
    return stock > 0 && stock <= 10;
  }).length;
  const outOfStockCount = products.filter(p => (p.variants?.reduce((sum, v) => sum + v.stock, 0) || 0) === 0).length;

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
          <div className="flex items-center gap-3">
            <button 
              onClick={() => refetch()}
              className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
            >
              <RefreshCw className="size-5 text-text-muted" />
            </button>
            <Link 
              href="/admin/products/new"
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90"
            >
              <Plus className="size-5" />
              Thêm sản phẩm
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Tổng sản phẩm</p>
            <p className="text-2xl font-bold text-text-main">{totalProducts}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Còn hàng</p>
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Sắp hết</p>
            <p className="text-2xl font-bold text-amber-600">{lowCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-text-muted">Hết hàng</p>
            <p className="text-2xl font-bold text-red-500">{outOfStockCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
            />
          </form>
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilters({ ...filters, category: cat.value || undefined, page: 1 })}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filters.category === cat.value || (!filters.category && !cat.value)
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-muted border border-border hover:border-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
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
                    {products.map((product) => {
                      const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
                      const stockStatus = getStockStatus(totalStock);
                      
                      return (
                        <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img 
                                src={product.images?.[0]?.url || 'https://via.placeholder.com/100'} 
                                alt={product.name} 
                                className="size-12 rounded-lg object-cover" 
                              />
                              <span className="font-medium text-text-main">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-text-muted">{product.category?.name || 'N/A'}</td>
                          <td className="py-4 px-6 text-right font-bold text-text-main">{formatPrice(product.price)}</td>
                          <td className="py-4 px-6 text-center text-text-main">{totalStock}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${stockStatus.className}`}>
                              {stockStatus.label}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                              <Link 
                                href={`/products/${product.slug || product.id}`}
                                className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                                target="_blank"
                              >
                                <Eye className="size-4" />
                              </Link>
                              <Link 
                                href={`/admin/products/${product.id}/edit`}
                                className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100"
                              >
                                <Edit className="size-4" />
                              </Link>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                disabled={deleteProduct.isPending}
                                className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 disabled:opacity-50"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Empty state */}
              {products.length === 0 && (
                <div className="text-center py-16">
                  <Package className="size-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Không có sản phẩm nào</p>
                </div>
              )}

              {/* Pagination */}
              {data && products.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                  <p className="text-sm text-text-muted">
                    Trang {data.meta.page} / {data.meta.totalPages} ({data.meta.total} sản phẩm)
                  </p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })}
                      disabled={(filters.page || 1) <= 1}
                      className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50"
                    >
                      Trước
                    </button>
                    <span className="px-3 py-1 bg-primary text-white rounded-lg text-sm">
                      {filters.page || 1}
                    </span>
                    <button 
                      onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
                      disabled={(filters.page || 1) >= data.meta.totalPages}
                      className="px-3 py-1 border border-border rounded-lg text-sm disabled:opacity-50"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

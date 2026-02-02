/**
 * Fashion AI - Admin Products
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Eye,
  Loader2
} from 'lucide-react';
import { useProducts } from '@/hooks/use-products';
import { formatCurrency } from '@/lib/utils/format';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const { data: productData, isLoading } = useProducts({ limit: 100 });
  const [search, setSearch] = useState('');

  const products = productData?.data || [];
  const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
      if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
          // Call API delete
          toast.success('Xóa sản phẩm thành công (Mock)');
      }
  };

  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-96">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
           <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
           <p className="text-secondary">Danh sách tất cả sản phẩm trong cửa hàng</p>
        </div>
        <Link href="/admin/products/create" className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Thêm sản phẩm
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1e1a14] p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input 
                 type="text" 
                 placeholder="Tìm kiếm sản phẩm..." 
                 className="input pl-10 w-full"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
          </div>
          <div className="flex gap-2">
              <button className="btn-outline flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Lọc
              </button>
          </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e1a14] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                          <th className="p-4 font-medium text-secondary text-sm">Sản phẩm</th>
                          <th className="p-4 font-medium text-secondary text-sm">Danh mục</th>
                          <th className="p-4 font-medium text-secondary text-sm">Giá bán</th>
                          <th className="p-4 font-medium text-secondary text-sm">Kho</th>
                          <th className="p-4 font-medium text-secondary text-sm text-right">Thao tác</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="p-4">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 relative overflow-hidden shrink-0">
                                          <Image 
                                              src={product.images.find(i => i.isMain)?.url || product.images[0]?.url || '/placeholder.jpg'} 
                                              alt={product.name}
                                              fill
                                              className="object-cover"
                                          />
                                      </div>
                                      <div>
                                          <p className="font-medium line-clamp-1 max-w-[200px]">{product.name}</p>
                                          <p className="text-xs text-secondary">ID: {product.id.slice(0, 8)}...</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="p-4">
                                  <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                                      {product.category?.name || 'Chưa phân loại'}
                                  </span>
                              </td>
                              <td className="p-4 font-medium">
                                  {formatCurrency(product.price)}
                              </td>
                              <td className="p-4">
                                  {/* Calculate total stock */}
                                  <span className="text-sm">
                                      {product.variants.reduce((acc, v) => acc + v.stock, 0)}
                                  </span>
                              </td>
                              <td className="p-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-secondary hover:text-primary transition-colors" title="Xem">
                                          <Eye className="w-4 h-4" />
                                      </button>
                                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-secondary hover:text-blue-500 transition-colors" title="Sửa">
                                          <Edit className="w-4 h-4" />
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-secondary hover:text-red-500 transition-colors" 
                                        title="Xóa"
                                      >
                                          <Trash2 className="w-4 h-4" />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      )) : (
                          <tr>
                              <td colSpan={5} className="p-8 text-center text-secondary">
                                  Không tìm thấy sản phẩm nào.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
          {/* Pagination could go here */}
      </div>
    </div>
  );
}

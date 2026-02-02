/**
 * Fashion AI - Admin Quản Lý Sản Phẩm
 * 
 * Danh sách sản phẩm với CRUD operations
 */

'use client';

import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';

// Mock products data
const products = [
  { id: 1, name: 'Áo sơ mi trắng Premium', sku: 'FA-001', price: 850000, stock: 45, status: 'active' },
  { id: 2, name: 'Đầm dự tiệc sang trọng', sku: 'FA-002', price: 1250000, stock: 12, status: 'active' },
  { id: 3, name: 'Quần tây navy công sở', sku: 'FA-003', price: 750000, stock: 0, status: 'out_of_stock' },
  { id: 4, name: 'Áo khoác denim phong cách', sku: 'FA-004', price: 950000, stock: 28, status: 'active' },
  { id: 5, name: 'Váy midi họa tiết', sku: 'FA-005', price: 680000, stock: 5, status: 'low_stock' },
];

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus className="w-5 h-5" />
          Thêm sản phẩm
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
            <option value="">Tất cả danh mục</option>
            <option value="ao">Áo</option>
            <option value="quan">Quần</option>
            <option value="dam">Đầm</option>
          </select>
          <select className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang bán</option>
            <option value="out_of_stock">Hết hàng</option>
            <option value="low_stock">Sắp hết</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary bg-gray-50 dark:bg-[#2c2822]">
                <th className="p-4 font-medium">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                </th>
                <th className="p-4 font-medium">Sản phẩm</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Giá</th>
                <th className="p-4 font-medium">Tồn kho</th>
                <th className="p-4 font-medium">Trạng thái</th>
                <th className="p-4 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-[#2c2822] flex items-center justify-center">
                        <span className="text-xl">👕</span>
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-secondary">{product.sku}</td>
                  <td className="p-4 font-medium text-primary">{formatPrice(product.price)}</td>
                  <td className="p-4 text-sm">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      product.status === 'active' ? 'bg-green-500/10 text-green-500' :
                      product.status === 'low_stock' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {product.status === 'active' ? 'Đang bán' : 
                       product.status === 'low_stock' ? 'Sắp hết' : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Eye className="w-4 h-4 text-secondary" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Edit2 className="w-4 h-4 text-secondary" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-secondary">Hiển thị 1-5 của 456 sản phẩm</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              Trước
            </button>
            <button className="px-3 py-1 rounded-lg bg-primary text-white text-sm">1</button>
            <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">2</button>
            <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">3</button>
            <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

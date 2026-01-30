/**
 * Admin Categories Management - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, GripVertical, FolderOpen } from 'lucide-react';

const categories = [
  { id: '1', name: 'Áo', slug: 'ao', products: 156, order: 1 },
  { id: '2', name: 'Váy/Đầm', slug: 'vay-dam', products: 98, order: 2 },
  { id: '3', name: 'Quần', slug: 'quan', products: 87, order: 3 },
  { id: '4', name: 'Áo khoác', slug: 'ao-khoac', products: 45, order: 4 },
  { id: '5', name: 'Phụ kiện', slug: 'phu-kien', products: 234, order: 5 },
];

export default function AdminCategories() {
  const [catList] = useState(categories);

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý Danh Mục</h1>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90">
            <Plus className="size-5" />
            Thêm danh mục
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary-50 border-b border-border">
                <th className="w-10"></th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Tên danh mục</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Slug</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Sản phẩm</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {catList.map((cat) => (
                <tr key={cat.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                  <td className="py-4 px-3 text-center cursor-move">
                    <GripVertical className="size-5 text-text-muted" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FolderOpen className="size-5 text-primary" />
                      </div>
                      <span className="font-medium text-text-main">{cat.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="px-2 py-1 bg-secondary-100 rounded text-sm">{cat.slug}</code>
                  </td>
                  <td className="py-4 px-6 text-center text-text-main">{cat.products}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
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
      </main>
    </div>
  );
}

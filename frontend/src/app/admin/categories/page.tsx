/**
 * Admin Categories Management - Fashion AI
 * 
 * CRUD categories với API integration
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, GripVertical, FolderOpen, X, Loader2, RefreshCw, Check } from 'lucide-react';
import { 
  useAdminCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory,
  type Category 
} from '@/hooks/useAdmin';
import { toastSuccess, toastError } from '@/stores';

export default function AdminCategories() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    order: 1,
    isActive: true,
  });

  const { data: categories, isLoading, refetch } = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const resetForm = () => {
    setFormData({ name: '', slug: '', description: '', order: 1, isActive: true });
    setIsCreating(false);
    setEditingId(null);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCreate = async () => {
    if (!formData.name) return;
    
    try {
      await createCategory.mutateAsync({
        ...formData,
        slug: formData.slug || generateSlug(formData.name),
      });
      toastSuccess('Thành công', 'Đã tạo danh mục mới');
      resetForm();
    } catch {
      toastError('Lỗi', 'Không thể tạo danh mục');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateCategory.mutateAsync({ 
        id, 
        data: {
          ...formData,
          slug: formData.slug || generateSlug(formData.name),
        }
      });
      toastSuccess('Thành công', 'Đã cập nhật danh mục');
      resetForm();
    } catch {
      toastError('Lỗi', 'Không thể cập nhật danh mục');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Xóa danh mục "${name}"?`)) return;
    
    try {
      await deleteCategory.mutateAsync(id);
      toastSuccess('Thành công', 'Đã xóa danh mục');
    } catch {
      toastError('Lỗi', 'Không thể xóa danh mục');
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setIsCreating(false);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      order: cat.order,
      isActive: cat.isActive,
    });
  };

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
          <div className="flex items-center gap-2">
            <button 
              onClick={() => refetch()}
              className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
            >
              <RefreshCw className="size-5 text-text-muted" />
            </button>
            <button 
              onClick={() => {
                resetForm();
                setIsCreating(true);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90"
            >
              <Plus className="size-5" />
              Thêm danh mục
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Create Form */}
        {isCreating && (
          <div className="bg-white rounded-2xl border border-border p-6 mb-6">
            <h2 className="text-lg font-bold text-text-main mb-4">Tạo Danh Mục Mới</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Tên danh mục *</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="VD: Áo khoác"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Slug</label>
                <input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="ao-khoac"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-main mb-2">Mô tả</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
                rows={2}
                placeholder="Mô tả ngắn về danh mục..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={resetForm} className="px-4 py-2 border border-border rounded-lg">
                Hủy
              </button>
              <button 
                onClick={handleCreate}
                disabled={createCategory.isPending || !formData.name}
                className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
              >
                {createCategory.isPending && <Loader2 className="size-4 animate-spin" />}
                Tạo danh mục
              </button>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-secondary-50 border-b border-border">
                  <th className="w-10"></th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Tên danh mục</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Slug</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Sản phẩm</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Trạng thái</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cat) => (
                  <tr key={cat.id} className="border-b border-border last:border-0 hover:bg-secondary-50">
                    <td className="py-4 px-3 text-center cursor-move">
                      <GripVertical className="size-5 text-text-muted" />
                    </td>
                    <td className="py-4 px-6">
                      {editingId === cat.id ? (
                        <input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FolderOpen className="size-5 text-primary" />
                          </div>
                          <span className="font-medium text-text-main">{cat.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {editingId === cat.id ? (
                        <input
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none"
                        />
                      ) : (
                        <code className="px-2 py-1 bg-secondary-100 rounded text-sm">{cat.slug}</code>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-text-main">{cat.productCount}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cat.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {cat.isActive ? 'Hoạt động' : 'Ẩn'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {editingId === cat.id ? (
                          <>
                            <button 
                              onClick={() => handleUpdate(cat.id)}
                              disabled={updateCategory.isPending}
                              className="size-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 disabled:opacity-50"
                            >
                              {updateCategory.isPending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                            </button>
                            <button 
                              onClick={resetForm}
                              className="size-8 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-100"
                            >
                              <X className="size-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => startEdit(cat)}
                              className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(cat.id, cat.name)}
                              disabled={deleteCategory.isPending}
                              className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 disabled:opacity-50"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Empty state */}
          {!isLoading && (!categories || categories.length === 0) && (
            <div className="text-center py-16">
              <FolderOpen className="size-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">Chưa có danh mục nào</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

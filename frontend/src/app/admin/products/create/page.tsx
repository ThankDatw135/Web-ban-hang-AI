/**
 * Fashion AI - Create Product Form
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Plus, X, Loader2 } from 'lucide-react';
import { useCreateProduct } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { useUploadAvatar as useUploadImage } from '@/hooks/use-user'; // Reuse generic upload
import Image from 'next/image';

interface Variant {
  size: string;
  color: string;
  stock: number;
}

export default function CreateProductPage() {
  const router = useRouter();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { data: categories } = useCategories();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    categoryId: '',
  });

  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([
    { size: 'M', color: 'Đen', stock: 10 }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          uploadImage(file, {
              onSuccess: (url) => setImages(prev => [...prev, url as any])
          });
      }
  };

  const removeImage = (index: number) => {
      setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddVariant = () => {
      setVariants(prev => [...prev, { size: 'M', color: 'Đen', stock: 10 }]);
  };

  const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
      const newVariants = [...variants];
      newVariants[index] = { ...newVariants[index], [field]: value };
      setVariants(newVariants);
  };

  const removeVariant = (index: number) => {
      setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('price', formData.price);
      if (formData.salePrice) payload.append('salePrice', formData.salePrice);
      payload.append('categoryId', formData.categoryId);
      
      // Images
      images.forEach(img => payload.append('images[]', img));
      
      // Variants need to be sent as JSON string or array usage depends on backend
      // Assuming backend parses JSON string for variants or handles generic params
      payload.append('variants', JSON.stringify(variants));

      createProduct(payload, {
          onSuccess: () => {
              router.push('/admin/products');
          }
      });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
       <div className="flex items-center gap-4">
           <Link href="/admin/products" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
               <ArrowLeft className="w-5 h-5" />
           </Link>
           <h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>
       </div>

       <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Column - Main Info */}
           <div className="lg:col-span-2 space-y-6">
               <div className="card p-6 space-y-4">
                   <h3 className="font-bold text-lg">Thông tin chung</h3>
                   
                   <div>
                       <label className="label">Tên sản phẩm</label>
                       <input 
                          type="text" 
                          className="input w-full" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="VD: Áo thun Basic"
                       />
                   </div>

                   <div>
                       <label className="label">Mô tả</label>
                       <textarea 
                          className="input w-full h-32 py-2" 
                          required
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Mô tả chi tiết sản phẩm..."
                       />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="label">Giá bán (VNĐ)</label>
                           <input 
                              type="number" 
                              className="input w-full" 
                              required
                              min={0}
                              value={formData.price}
                              onChange={(e) => setFormData({...formData, price: e.target.value})}
                           />
                       </div>
                       <div>
                           <label className="label">Giá khuyến mãi (VNĐ)</label>
                           <input 
                              type="number" 
                              className="input w-full" 
                              min={0}
                              value={formData.salePrice}
                              onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                           />
                       </div>
                   </div>
               </div>

               {/* Variants */}
               <div className="card p-6 space-y-4">
                   <div className="flex items-center justify-between">
                       <h3 className="font-bold text-lg">Biến thể (Màu sắc & Size)</h3>
                       <button type="button" onClick={handleAddVariant} className="btn-ghost flex items-center gap-1 text-sm">
                           <Plus className="w-4 h-4" /> Thêm biến thể
                       </button>
                   </div>
                   
                   <div className="space-y-3">
                       {variants.map((variant, index) => (
                           <div key={index} className="flex gap-3 items-end p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                               <div className="flex-1">
                                   <label className="text-xs font-medium mb-1 block">Size</label>
                                   <input 
                                     type="text" 
                                     className="input w-full h-9 text-sm"
                                     value={variant.size}
                                     onChange={(e) => updateVariant(index, 'size', e.target.value)} 
                                   />
                               </div>
                               <div className="flex-1">
                                   <label className="text-xs font-medium mb-1 block">Màu</label>
                                   <input 
                                     type="text" 
                                     className="input w-full h-9 text-sm"
                                     value={variant.color}
                                     onChange={(e) => updateVariant(index, 'color', e.target.value)} 
                                   />
                               </div>
                               <div className="w-24">
                                   <label className="text-xs font-medium mb-1 block">Kho</label>
                                   <input 
                                     type="number" 
                                     className="input w-full h-9 text-sm"
                                     value={variant.stock}
                                     onChange={(e) => updateVariant(index, 'stock', Number(e.target.value))} 
                                   />
                               </div>
                               <button 
                                  type="button" 
                                  onClick={() => removeVariant(index)}
                                  className="p-2 text-error hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg"
                               >
                                   <TrashIcon className="w-4 h-4" />
                               </button>
                           </div>
                       ))}
                   </div>
               </div>
           </div>

           {/* Right Column */}
           <div className="space-y-6">
               <div className="card p-6 space-y-4">
                   <h3 className="font-bold text-lg">Phân loại</h3>
                   <div>
                       <label className="label">Danh mục</label>
                       <select 
                          className="input w-full"
                          required
                          value={formData.categoryId}
                          onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                       >
                           <option value="">Chọn danh mục</option>
                           {categories?.map((cat: any) => (
                               <option key={cat.id} value={cat.id}>{cat.name}</option>
                           ))}
                       </select>
                   </div>
               </div>

               <div className="card p-6 space-y-4">
                   <h3 className="font-bold text-lg">Hình ảnh</h3>
                   <div className="grid grid-cols-2 gap-3">
                       {images.map((img, idx) => (
                           <div key={idx} className="aspect-square rounded-lg relative overflow-hidden group bg-gray-100">
                               <Image src={img} alt="" fill className="object-cover" />
                               <button 
                                  type="button"
                                  onClick={() => removeImage(idx)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                               >
                                   <X className="w-3 h-3" />
                               </button>
                           </div>
                       ))}
                       <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary cursor-pointer flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors">
                           {isUploading ? (
                               <Loader2 className="w-6 h-6 animate-spin" />
                           ) : (
                               <>
                                   <Upload className="w-6 h-6 mb-2" />
                                   <span className="text-xs">Tải ảnh</span>
                               </>
                           )}
                           <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                       </label>
                   </div>
                   <p className="text-xs text-secondary text-center">
                       Ảnh đầu tiên sẽ là ảnh đại diện
                   </p>
               </div>

               <button 
                  type="submit" 
                  className="btn-primary w-full py-3"
                  disabled={isCreating}
               >
                   {isCreating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Tạo sản phẩm'}
               </button>
           </div>
       </form>
    </div>
  );
}

function TrashIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
    )
}

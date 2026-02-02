/**
 * Fashion AI - Addresses Page
 */

'use client';

import { useState } from 'react';
import { Plus, MapPin, Pencil, Trash2, Check } from 'lucide-react';
import { useAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress, useSetDefaultAddress } from '@/hooks/use-address';

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddresses();
  const { mutate: createAddress } = useCreateAddress();
  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefault } = useSetDefaultAddress();

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
      fullName: '',
      phone: '',
      street: '',
      district: '',
      city: '',
      isDefault: false
  });

  const handleEdit = (addr: any) => {
      setFormData({
          fullName: addr.fullName,
          phone: addr.phone,
          street: addr.street,
          district: addr.district,
          city: addr.city,
          isDefault: addr.isDefault
      });
      setEditId(addr.id);
      setIsEditing(true);
  };

  const resetForm = () => {
      setFormData({ fullName: '', phone: '', street: '', district: '', city: '', isDefault: false });
      setEditId(null);
      setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const payload = { ...formData, province: formData.city }; // Simplification
      
      if (editId) {
          updateAddress({ id: editId, data: payload }, { onSuccess: resetForm });
      } else {
          createAddress(payload, { onSuccess: resetForm });
      }
  };

  const handleDelete = (id: string) => {
      if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
          deleteAddress(id);
      }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold">Sổ địa chỉ</h1>
           <button 
             onClick={() => { resetForm(); setIsEditing(true); }}
             className="btn-primary flex items-center gap-2"
           >
               <Plus className="w-4 h-4" />
               Thêm địa chỉ mới
           </button>
       </div>

       {isEditing && (
           <div className="card p-6 bg-gray-50 dark:bg-gray-800 border border-primary animate-slide-down">
               <h3 className="font-bold mb-4">{editId ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</h3>
               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input 
                        required
                        placeholder="Họ tên" 
                        className="input"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                     />
                     <input 
                        required
                        placeholder="Số điện thoại" 
                        className="input"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                     />
                     <input 
                        required
                        placeholder="Địa chỉ (Số nhà, đường)" 
                        className="input md:col-span-2"
                        value={formData.street}
                        onChange={e => setFormData({...formData, street: e.target.value})}
                     />
                     <input 
                        required
                        placeholder="Phường/Xã/Quận/Huyện" 
                        className="input"
                        value={formData.district}
                        onChange={e => setFormData({...formData, district: e.target.value})}
                     />
                     <input 
                        required
                        placeholder="Tỉnh/Thành phố" 
                        className="input"
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                     />
                     <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                         <button type="button" onClick={resetForm} className="btn-ghost">Hủy</button>
                         <button type="submit" className="btn-primary">Lưu</button>
                     </div>
               </form>
           </div>
       )}

       <div className="grid gap-4">
           {addresses?.map((addr) => (
               <div key={addr.id} className="card p-5 flex items-start justify-between group">
                   <div>
                       <div className="flex items-center gap-3 mb-2">
                           <span className="font-bold text-lg">{addr.fullName}</span>
                           <span className="text-secondary text-sm flex items-center gap-1">
                               {addr.phone}
                           </span>
                           {addr.isDefault && (
                               <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                   Mặc định
                               </span>
                           )}
                       </div>
                       <p className="text-secondary flex items-start gap-2">
                           <MapPin className="w-4 h-4 mt-1 shrink-0" />
                           {addr.street}, {addr.ward ? `${addr.ward}, ` : ''}{addr.district}, {addr.city}
                       </p>
                   </div>
                   <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       {!addr.isDefault && (
                            <button 
                                onClick={() => setDefault(addr.id)}
                                className="text-xs text-primary hover:underline flex items-center justify-end gap-1"
                            >
                                <Check className="w-3 h-3" />
                                Đặt mặc định
                            </button>
                       )}
                       <div className="flex gap-2 justify-end">
                           <button onClick={() => handleEdit(addr)} className="btn-ghost p-2 h-auto text-blue-500 hover:bg-blue-50">
                               <Pencil className="w-4 h-4" />
                           </button>
                           <button onClick={() => handleDelete(addr.id)} className="btn-ghost p-2 h-auto text-red-500 hover:bg-red-50">
                               <Trash2 className="w-4 h-4" />
                           </button>
                       </div>
                   </div>
               </div>
           ))}

           {addresses?.length === 0 && !isEditing && (
               <div className="text-center py-12 text-secondary">
                   Chưa có địa chỉ nào
               </div>
           )}
       </div>
    </div>
  );
}

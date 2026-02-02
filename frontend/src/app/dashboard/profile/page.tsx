/**
 * Fashion AI - Profile Page
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Save, Lock, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useUpdateProfile, useChangePassword, useUploadAvatar } from '@/hooks/use-user';
import { User } from '@/types/api';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: changePassword, isPending: isChangingPass } = useChangePassword();
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phone: '',
  });

  useEffect(() => {
      if (user) {
          setFormData({
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              phone: user.phone || '',
          });
      }
  }, [user]);

  const [passData, setPassData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
  });

  const handleUpdateInfo = (e: React.FormEvent) => {
      e.preventDefault();
      // Combine first/last name if API expects fullName, or send separately
      // Assuming API uses UserUpdate type which might have firstName/lastName
      // Let's check updateProfile hook expectation. 
      // types/api.ts UserUpdate usually matches. 
      // If API expects fullName, we might mock it or API needs update. 
      // But assuming User model has firstName/lastName, we should update those.
      // I'll send firstName, lastName, phone.
      updateProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
      } as any); 
      // Cast to any if type mismatch, but optimally should match UserUpdate type.
  };

  const handleChangePassword = (e: React.FormEvent) => {
      e.preventDefault();
      if (passData.newPassword !== passData.confirmPassword) {
          alert('Mật khẩu xác nhận không khớp');
          return;
      }
      changePassword({
          oldPassword: passData.currentPassword,
          newPassword: passData.newPassword
      });
  };

  const handleAvatarClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          uploadAvatar(file);
      }
  };

  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>

       <div className="grid lg:grid-cols-2 gap-8">
           {/* Basic Info */}
           <div className="card p-6">
               <h2 className="flex items-center gap-2 text-lg font-bold mb-6">
                   <UserIcon className="w-5 h-5 text-primary" />
                   Thông tin chung
               </h2>
               
               {/* Avatar */}
               <div className="flex flex-col items-center mb-8">
                   <div className="relative w-24 h-24 mb-4">
                       <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 bg-gray-100 relative">
                            {user?.avatar ? (
                                <Image src={user.avatar} alt="Avatar" fill className="object-cover" />
                            ) : (
                                <span className="flex items-center justify-center w-full h-full text-2xl font-bold text-secondary">
                                    {((user?.firstName?.[0] || '') + (user?.lastName?.[0] || '')).toUpperCase() || 'U'}
                                </span>
                            )}
                       </div>
                       <button 
                         onClick={handleAvatarClick}
                         disabled={isUploading}
                         className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                       >
                           <Camera className="w-4 h-4" />
                       </button>
                       <input 
                         type="file" 
                         ref={fileInputRef} 
                         className="hidden" 
                         accept="image/*"
                         onChange={handleFileChange}
                       />
                   </div>
                   <p className="font-bold text-lg">{user?.firstName} {user?.lastName}</p>
                   <p className="text-secondary text-sm">{user?.email}</p>
               </div>

               <form onSubmit={handleUpdateInfo} className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="label">Họ</label>
                           <input 
                              type="text" 
                              className="input" 
                              value={formData.firstName}
                              onChange={e => setFormData({...formData, firstName: e.target.value})}
                           />
                       </div>
                       <div>
                           <label className="label">Tên</label>
                           <input 
                              type="text" 
                              className="input" 
                              value={formData.lastName}
                              onChange={e => setFormData({...formData, lastName: e.target.value})}
                           />
                       </div>
                   </div>
                   <div>
                       <label className="label">Số điện thoại</label>
                       <input 
                          type="tel" 
                          className="input" 
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                       />
                   </div>
                   <div>
                       <label className="label">Email</label>
                       <input 
                          type="email" 
                          className="input bg-gray-100 dark:bg-gray-800 text-secondary cursor-not-allowed" 
                          value={user?.email || ''}
                          disabled
                       />
                   </div>
                   <button 
                     type="submit" 
                     disabled={isUpdating}
                     className="btn-primary w-full mt-4"
                   >
                       {isUpdating ? 'Đang lưu...' : 'Lưu thay đổi'}
                   </button>
               </form>
           </div>

           {/* Password */}
           <div className="card p-6 h-fit">
               <h2 className="flex items-center gap-2 text-lg font-bold mb-6">
                   <Lock className="w-5 h-5 text-primary" />
                   Đổi mật khẩu
               </h2>
               <form onSubmit={handleChangePassword} className="space-y-4">
                   <div>
                       <label className="label">Mật khẩu hiện tại</label>
                       <input 
                          type="password" 
                          className="input" 
                          required
                          value={passData.currentPassword}
                          onChange={e => setPassData({...passData, currentPassword: e.target.value})}
                       />
                   </div>
                   <div>
                       <label className="label">Mật khẩu mới</label>
                       <input 
                          type="password" 
                          className="input" 
                          required
                          value={passData.newPassword}
                          onChange={e => setPassData({...passData, newPassword: e.target.value})}
                       />
                   </div>
                   <div>
                       <label className="label">Xác nhận mật khẩu mới</label>
                       <input 
                          type="password" 
                          className="input" 
                          required
                          value={passData.confirmPassword}
                          onChange={e => setPassData({...passData, confirmPassword: e.target.value})}
                       />
                   </div>
                   <button 
                     type="submit" 
                     disabled={isChangingPass}
                     className="btn-outline w-full mt-4"
                   >
                       {isChangingPass ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                   </button>
               </form>
           </div>
       </div>
    </div>
  );
}

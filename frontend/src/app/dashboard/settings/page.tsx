/**
 * Fashion AI - Settings Page
 */

'use client';

import { useState } from 'react';
import { Moon, Sun, Bell, Globe, Trash2, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light'); // Mock state, usually from provider
  const [notifications, setNotifications] = useState({
      email: true,
      sms: false,
      promo: true
  });
  const [language, setLanguage] = useState('vi');

  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold">Cài đặt</h1>

       <div className="grid gap-6">
           {/* Appearance */}
           <div className="card p-6">
               <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                   <Sun className="w-5 h-5 text-primary" />
                   Giao diện
               </h2>
               <div className="flex items-center justify-between">
                   <span>Chế độ tối (Dark Mode)</span>
                   <button 
                     onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                     className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${theme === 'dark' ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}
                   >
                       <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                   </button>
               </div>
           </div>

           {/* Notifications */}
           <div className="card p-6">
               <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                   <Bell className="w-5 h-5 text-primary" />
                   Thông báo
               </h2>
               <div className="space-y-4">
                   <div className="flex items-center justify-between">
                       <span>Email thông báo đơn hàng</span>
                       <input 
                         type="checkbox" 
                         className="toggle"
                         checked={notifications.email} 
                         onChange={() => setNotifications({...notifications, email: !notifications.email})}
                       />
                   </div>
                   <div className="flex items-center justify-between">
                       <span>Tin nhắn SMS</span>
                       <input 
                         type="checkbox" 
                         className="toggle"
                         checked={notifications.sms} 
                         onChange={() => setNotifications({...notifications, sms: !notifications.sms})}
                       />
                   </div>
                   <div className="flex items-center justify-between">
                       <span>Email khuyến mãi & Tin tức</span>
                       <input 
                         type="checkbox" 
                         className="toggle"
                         checked={notifications.promo} 
                         onChange={() => setNotifications({...notifications, promo: !notifications.promo})}
                       />
                   </div>
               </div>
           </div>

           {/* Language */}
           <div className="card p-6">
               <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                   <Globe className="w-5 h-5 text-primary" />
                   Ngôn ngữ
               </h2>
               <div className="flex gap-4">
                   <button 
                     onClick={() => setLanguage('vi')}
                     className={`px-4 py-2 rounded-lg border ${language === 'vi' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-gray-200'}`}
                   >
                       Tiếng Việt
                   </button>
                   <button 
                     onClick={() => setLanguage('en')}
                     className={`px-4 py-2 rounded-lg border ${language === 'en' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-gray-200'}`}
                   >
                       English
                   </button>
               </div>
           </div>

           {/* Danger Zone */}
           <div className="card p-6 border-red-100 bg-red-50 dark:bg-red-900/10">
               <h2 className="flex items-center gap-2 text-lg font-bold mb-4 text-red-600">
                   <Shield className="w-5 h-5" />
                   Vùng nguy hiểm
               </h2>
               <div className="flex items-center justify-between">
                   <div>
                       <p className="font-bold text-gray-900 dark:text-white">Xóa tài khoản</p>
                       <p className="text-sm text-secondary">Hành động này không thể hoàn tác</p>
                   </div>
                   <button 
                     onClick={() => alert('Vui lòng liên hệ admin để xóa tài khoản')}
                     className="btn hover:bg-red-600 hover:text-white border-red-200 text-red-600 transition-colors px-4 py-2 rounded-lg border"
                   >
                       <Trash2 className="w-4 h-4 inline-block mr-2" />
                       Xóa tài khoản
                   </button>
               </div>
           </div>
       </div>
    </div>
  );
}

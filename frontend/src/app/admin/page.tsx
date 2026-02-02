/**
 * Fashion AI - Admin Dashboard
 */

'use client';

import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  Activity
} from 'lucide-react';

const STATS = [
  { 
     name: 'Tổng doanh thu', 
     value: '128.500.000đ', 
     change: '+12.5%', 
     trend: 'up',
     icon: DollarSign,
     color: 'text-green-600',
     bg: 'bg-green-100'
  },
  { 
      name: 'Tổng đơn hàng', 
      value: '1,245', 
      change: '+8.2%', 
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
   },
   { 
      name: 'Khách hàng mới', 
      value: '356', 
      change: '-2.4%', 
      trend: 'down',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
   },
   { 
      name: 'Sản phẩm', 
      value: '86', 
      change: '+4', 
      trend: 'up',
      icon: Package,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
   },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-secondary">Tổng quan về hoạt động kinh doanh</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
                <div key={stat.name} className="bg-white dark:bg-[#1e1a14] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-sm font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                            {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        </span>
                    </div>
                    <div>
                        <p className="text-secondary text-sm font-medium mb-1">{stat.name}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                </div>
            );
        })}
      </div>

      {/* Charts & Recent Activity Section Mock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart Placeholder */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1e1a14] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                 <h3 className="font-bold text-lg">Biểu đồ doanh thu</h3>
                 <select className="select select-sm border-gray-200">
                     <option>7 ngày qua</option>
                     <option>Tháng này</option>
                     <option>Năm nay</option>
                 </select>
             </div>
             <div className="h-64 flex items-end justify-between gap-2">
                 {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                     <div key={i} className="w-full bg-primary/10 rounded-t-lg relative group overflow-hidden" style={{ height: `${h}%` }}>
                         <div className="absolute inset-x-0 bottom-0 bg-primary h-0 transition-all duration-500 group-hover:h-full"></div>
                     </div>
                 ))}
             </div>
             <div className="flex justify-between mt-4 text-xs text-secondary font-medium uppercase">
                 <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-[#1e1a14] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Hoạt động gần đây</h3>
              <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                              <Activity className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                              <p className="text-sm font-medium">Đơn hàng mới <span className="text-primary font-bold">#ORD-{1000+i}</span></p>
                              <p className="text-xs text-secondary">Vừa đặt 5 phút trước</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}

/**
 * Fashion AI - Admin Dashboard
 * 
 * Trang tổng quan quản trị với thống kê
 */

import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Eye
} from 'lucide-react';
import Link from 'next/link';

// Mock stats data
const stats = [
  { 
    label: 'Doanh thu', 
    value: '125.5M', 
    unit: 'VNĐ',
    change: '+12.5%', 
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-500 bg-green-500/10'
  },
  { 
    label: 'Đơn hàng', 
    value: '1,234', 
    unit: '',
    change: '+8.2%', 
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-blue-500 bg-blue-500/10'
  },
  { 
    label: 'Khách hàng', 
    value: '5,678', 
    unit: '',
    change: '+15.3%', 
    trend: 'up',
    icon: Users,
    color: 'text-purple-500 bg-purple-500/10'
  },
  { 
    label: 'Sản phẩm', 
    value: '456', 
    unit: '',
    change: '-2.1%', 
    trend: 'down',
    icon: Package,
    color: 'text-orange-500 bg-orange-500/10'
  },
];

// Mock recent orders
const recentOrders = [
  { id: 'FA-001', customer: 'Nguyễn Văn A', total: 850000, status: 'Đang xử lý' },
  { id: 'FA-002', customer: 'Trần Thị B', total: 1250000, status: 'Đang giao' },
  { id: 'FA-003', customer: 'Lê Văn C', total: 650000, status: 'Đã giao' },
  { id: 'FA-004', customer: 'Phạm Thị D', total: 950000, status: 'Đang xử lý' },
  { id: 'FA-005', customer: 'Hoàng Văn E', total: 750000, status: 'Đã hủy' },
];

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-secondary">Cập nhật: 02/02/2026, 12:00</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">
                {stat.value}
                {stat.unit && <span className="text-sm font-normal text-secondary ml-1">{stat.unit}</span>}
              </p>
              <p className="text-sm text-secondary">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold">Đơn hàng gần đây</h2>
            <Link href="/admin/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
              Xem tất cả
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-secondary border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 font-medium">Mã đơn</th>
                  <th className="p-4 font-medium">Khách hàng</th>
                  <th className="p-4 font-medium">Tổng tiền</th>
                  <th className="p-4 font-medium">Trạng thái</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4 text-sm">{order.customer}</td>
                    <td className="p-4 text-sm font-medium text-primary">{formatPrice(order.total)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Đã giao' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'Đang giao' ? 'bg-blue-500/10 text-blue-500' :
                        order.status === 'Đang xử lý' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/orders/${order.id}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex">
                        <Eye className="w-4 h-4 text-secondary" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-4">
          <h2 className="font-bold mb-4">Thao tác nhanh</h2>
          <div className="space-y-3">
            <Link href="/admin/products/new" className="block p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Thêm sản phẩm mới</p>
                  <p className="text-xs text-secondary">Tạo sản phẩm mới</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/coupons/new" className="block p-4 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Tạo mã giảm giá</p>
                  <p className="text-xs text-secondary">Tạo coupon mới</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/ai-jobs" className="block p-4 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Xem AI Jobs</p>
                  <p className="text-xs text-secondary">Theo dõi xử lý AI</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

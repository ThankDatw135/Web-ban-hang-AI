/**
 * Fashion AI - Admin Hỗ Trợ
 * 
 * Quản lý ticket hỗ trợ khách hàng
 */

'use client';

import { MessageSquare, Search, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Mock tickets data
const tickets = [
  { id: 'TK-001', subject: 'Không nhận được đơn hàng', user: 'Nguyễn Văn A', status: 'open', priority: 'high', createdAt: '02/02/2026' },
  { id: 'TK-002', subject: 'Muốn đổi size sản phẩm', user: 'Trần Thị B', status: 'pending', priority: 'medium', createdAt: '01/02/2026' },
  { id: 'TK-003', subject: 'Hỏi về bảo hành', user: 'Lê Văn C', status: 'resolved', priority: 'low', createdAt: '30/01/2026' },
  { id: 'TK-004', subject: 'Lỗi thanh toán VNPay', user: 'Phạm Thị D', status: 'open', priority: 'high', createdAt: '02/02/2026' },
  { id: 'TK-005', subject: 'Yêu cầu hoàn tiền', user: 'Hoàng Văn E', status: 'pending', priority: 'medium', createdAt: '31/01/2026' },
];

// Status config
const statusConfig: Record<string, { label: string; color: string; icon: typeof MessageSquare }> = {
  open: { label: 'Mới', color: 'bg-red-500/10 text-red-500', icon: AlertCircle },
  pending: { label: 'Đang xử lý', color: 'bg-yellow-500/10 text-yellow-500', icon: Clock },
  resolved: { label: 'Đã giải quyết', color: 'bg-green-500/10 text-green-500', icon: CheckCircle },
};

// Priority config
const priorityConfig: Record<string, string> = {
  high: 'bg-red-500 text-white',
  medium: 'bg-yellow-500 text-white',
  low: 'bg-gray-400 text-white',
};

export default function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hỗ trợ khách hàng</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{tickets.filter(t => t.status === 'open').length}</p>
            <p className="text-xs text-secondary">Ticket mới</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{tickets.filter(t => t.status === 'pending').length}</p>
            <p className="text-xs text-secondary">Đang xử lý</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{tickets.filter(t => t.status === 'resolved').length}</p>
            <p className="text-xs text-secondary">Đã giải quyết</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm ticket..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary transition-all"
          />
        </div>
        <select className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
          <option value="">Tất cả trạng thái</option>
          <option value="open">Mới</option>
          <option value="pending">Đang xử lý</option>
          <option value="resolved">Đã giải quyết</option>
        </select>
        <select className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
          <option value="">Tất cả độ ưu tiên</option>
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
          <option value="low">Thấp</option>
        </select>
      </div>

      {/* Tickets Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary bg-gray-50 dark:bg-[#2c2822]">
                <th className="p-4 font-medium">Ticket</th>
                <th className="p-4 font-medium">Tiêu đề</th>
                <th className="p-4 font-medium">Người gửi</th>
                <th className="p-4 font-medium">Ưu tiên</th>
                <th className="p-4 font-medium">Trạng thái</th>
                <th className="p-4 font-medium">Ngày tạo</th>
                <th className="p-4 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                const status = statusConfig[ticket.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={ticket.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium">{ticket.id}</td>
                    <td className="p-4">
                      <p className="font-medium line-clamp-1">{ticket.subject}</p>
                    </td>
                    <td className="p-4 text-sm">{ticket.user}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${priorityConfig[ticket.priority]}`}>
                        {ticket.priority === 'high' ? 'Cao' : ticket.priority === 'medium' ? 'TB' : 'Thấp'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-secondary">{ticket.createdAt}</td>
                    <td className="p-4">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex">
                        <Eye className="w-4 h-4 text-secondary" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

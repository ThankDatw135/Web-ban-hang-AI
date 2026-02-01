/**
 * Fashion AI - Admin Support Management Page
 * 
 * Quản lý yêu cầu hỗ trợ từ khách hàng
 */

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Plus, Search, Eye, MessageCircle, Clock, AlertCircle,
  CheckCircle2, User, Mail, TrendingUp, TrendingDown
} from 'lucide-react';

interface Ticket {
  id: string;
  ticketNumber: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'PROCESSING' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TK-8821',
    customer: { name: 'Minh Anh', email: 'minhanh@gmail.com' },
    subject: 'Lỗi thử đồ AI không hiển thị kết quả',
    category: 'Kỹ thuật AI',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: '2026-01-31T10:30:00',
  },
  {
    id: '2',
    ticketNumber: 'TK-8820',
    customer: { name: 'Hoàng Nam', email: 'namhoang@vnn.vn' },
    subject: 'Yêu cầu hoàn tiền đơn hàng #ORD-993',
    category: 'Thanh toán',
    priority: 'MEDIUM',
    status: 'PROCESSING',
    createdAt: '2026-01-31T09:15:00',
  },
  {
    id: '3',
    ticketNumber: 'TK-8819',
    customer: { name: 'Linh Chi', email: 'linhchi@gmail.com' },
    subject: 'Góp ý về tính năng gợi ý phối đồ',
    category: 'Sản phẩm',
    priority: 'LOW',
    status: 'RESOLVED',
    createdAt: '2026-01-30T16:45:00',
  },
  {
    id: '4',
    ticketNumber: 'TK-8818',
    customer: { name: 'Tuấn Vũ', email: 'tuanvu.dev@gmail.com' },
    subject: 'Không thể tải lên ảnh để tạo avatar AI',
    category: 'Kỹ thuật AI',
    priority: 'HIGH',
    status: 'PROCESSING',
    createdAt: '2026-01-30T14:20:00',
  },
];

const statusLabels: Record<string, { label: string; class: string }> = {
  OPEN: { label: 'Chưa đọc', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  PROCESSING: { label: 'Đang xử lý', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  RESOLVED: { label: 'Đã xong', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  CLOSED: { label: 'Đóng', class: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
};

const priorityLabels: Record<string, { label: string; class: string }> = {
  HIGH: { label: '+ Cấp', class: 'text-red-500' },
  MEDIUM: { label: 'Thường', class: 'text-yellow-500' },
  LOW: { label: 'Thấp', class: 'text-gray-400' },
};

export default function AdminSupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = {
    open: mockTickets.filter(t => t.status === 'OPEN').length,
    processing: mockTickets.filter(t => t.status === 'PROCESSING').length,
    resolved: mockTickets.filter(t => ['RESOLVED', 'CLOSED'].includes(t.status)).length,
    avgResponseTime: 15,
  };

  const filteredTickets = mockTickets.filter(t => {
    const matchSearch = t.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#0f0a18] text-white p-6 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-gray-400 text-sm">Admin &gt; Hỗ trợ</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              Quản lý Yêu cầu Hỗ trợ
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Theo dõi và xử lý các yêu cầu từ khách hàng trên hệ thống Fashion AI
            </p>
          </div>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white font-bold px-6 py-3 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Tạo yêu cầu mới
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1225] rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-gray-400 text-sm">Chờ xử lý</span>
            </div>
            <p className="text-2xl font-bold">{stats.open}</p>
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +2.5%
            </p>
          </div>

          <div className="bg-[#1a1225] rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-gray-400 text-sm">Đang xử lý</span>
            </div>
            <p className="text-2xl font-bold">{stats.processing}</p>
            <p className="text-gray-400 text-xs mt-1">0%</p>
          </div>

          <div className="bg-[#1a1225] rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-gray-400 text-sm">Đã giải quyết hôm nay</span>
            </div>
            <p className="text-2xl font-bold">{stats.resolved}</p>
            <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12%
            </p>
          </div>

          <div className="bg-[#1a1225] rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <span className="text-gray-400 text-sm">Thời gian phản hồi TB</span>
            </div>
            <p className="text-2xl font-bold">{stats.avgResponseTime}p</p>
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -5%
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập ID, Email hoặc Tên khách hàng..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="OPEN">Chưa đọc</option>
            <option value="PROCESSING">Đang xử lý</option>
            <option value="RESOLVED">Đã xong</option>
          </select>
          <select className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none">
            <option value="">Độ ưu tiên</option>
            <option value="HIGH">Cấp bách</option>
            <option value="MEDIUM">Thường</option>
            <option value="LOW">Thấp</option>
          </select>
        </div>

        {/* Tickets Table */}
        <div className="bg-[#1a1225] rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-gray-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">ID</th>
                  <th className="px-6 py-4 text-left font-medium">Khách hàng</th>
                  <th className="px-6 py-4 text-left font-medium">Tiêu đề</th>
                  <th className="px-6 py-4 text-left font-medium">Phân loại</th>
                  <th className="px-6 py-4 text-left font-medium">Ưu tiên</th>
                  <th className="px-6 py-4 text-left font-medium">Trạng thái</th>
                  <th className="px-6 py-4 text-left font-medium">Ngày tạo</th>
                  <th className="px-6 py-4 text-left font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTickets.map((ticket) => {
                  const status = statusLabels[ticket.status];
                  const priority = priorityLabels[ticket.priority];
                  
                  return (
                    <tr key={ticket.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <code className="text-accent font-mono text-xs">#{ticket.ticketNumber}</code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-xs font-bold">
                            {ticket.customer.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{ticket.customer.name}</p>
                            <p className="text-xs text-gray-500">{ticket.customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[200px]">
                        <p className="text-white truncate">{ticket.subject}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn('text-xs font-medium', priority.class)}>
                          {priority.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn('px-2 py-1 rounded text-xs font-medium', status.class)}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(ticket.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 bg-accent/20 hover:bg-accent text-accent hover:text-white rounded text-xs font-medium transition-colors">
                            {ticket.status === 'OPEN' ? 'Phản hồi' : 'Chi tiết'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/5 flex justify-between items-center text-sm text-gray-400">
            <span>Hiển thị 1 đến 4 trong tổng số {mockTickets.length} yêu cầu</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/10">&lt; 1</button>
              <button className="px-3 py-1 rounded bg-accent text-white">2</button>
              <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/10">3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

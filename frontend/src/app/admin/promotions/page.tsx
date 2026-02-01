/**
 * Fashion AI - Admin Promotions Management Page
 * 
 * Quản lý chiến dịch khuyến mãi
 */

'use client';

import { useState } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { 
  Plus, Search, Edit, Trash2, Eye, TrendingUp, 
  Tag, DollarSign, BarChart3, Sparkles, Calendar
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  value: number;
  issued: number;
  used: number;
  revenue: number;
  startDate: string;
  endDate: string;
  status: 'RUNNING' | 'ENDED' | 'SCHEDULED';
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Ưu đãi Thử đồ AI',
    code: 'TRYON2024',
    type: 'PERCENTAGE',
    value: 20,
    issued: 4200,
    used: 1344,
    revenue: 450000000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'RUNNING',
  },
  {
    id: '2',
    name: 'Quét Dáng Người Mới',
    code: 'SCAN3DFIT',
    type: 'PERCENTAGE',
    value: 15,
    issued: 2150,
    used: 451,
    revenue: 210000000,
    startDate: '2026-01-15',
    endDate: '2026-06-30',
    status: 'RUNNING',
  },
  {
    id: '3',
    name: 'Mùa Lễ Hội 2025',
    code: 'XMAS2923',
    type: 'FIXED_AMOUNT',
    value: 500000,
    issued: 5000,
    used: 5000,
    revenue: 580000000,
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    status: 'ENDED',
  },
  {
    id: '4',
    name: 'Bộ Sưu Tập AI Gen',
    code: 'AIGENFALL',
    type: 'PERCENTAGE',
    value: 10,
    issued: 0,
    used: 0,
    revenue: 0,
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    status: 'SCHEDULED',
  },
];

const statusLabels: Record<string, { label: string; class: string }> = {
  RUNNING: { label: 'Đang chạy', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  ENDED: { label: 'Kết thúc', class: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
  SCHEDULED: { label: 'Lên lịch', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
};

export default function AdminPromotionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalIssued: mockCampaigns.reduce((sum, c) => sum + c.issued, 0),
    avgUsageRate: Math.round(
      mockCampaigns.reduce((sum, c) => sum + (c.issued > 0 ? (c.used / c.issued) * 100 : 0), 0) / 
      mockCampaigns.filter(c => c.issued > 0).length
    ),
    totalRevenue: mockCampaigns.reduce((sum, c) => sum + c.revenue, 0),
  };

  const filteredCampaigns = mockCampaigns.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f0a18] text-white p-6 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-gray-400 text-sm">Admin &gt; Khuyến mãi</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              Quản lý Chiến dịch Khuyến mãi
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Theo dõi, đo lường và tối ưu hóa các chương trình ưu đãi của Fashion AI.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white font-bold px-6 py-3 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Tạo khuyến mãi mới
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1225] rounded-xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Tag className="w-5 h-5 text-accent" />
              </div>
              <span className="text-gray-400 text-sm">Tổng mã đã phát</span>
            </div>
            <p className="text-3xl font-bold">{stats.totalIssued.toLocaleString()}</p>
            <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% so với tháng trước
            </p>
          </div>

          <div className="bg-[#1a1225] rounded-xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-400 text-sm">Tỷ lệ sử dụng trung bình</span>
            </div>
            <p className="text-3xl font-bold">{stats.avgUsageRate}%</p>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
              <div className="bg-green-400 h-full rounded-full" style={{ width: `${stats.avgUsageRate}%` }} />
            </div>
          </div>

          <div className="bg-[#1a1225] rounded-xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className="text-gray-400 text-sm">Doanh thu từ Voucher</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(stats.totalRevenue).replace('₫', '')} <span className="text-lg">đ</span></p>
            <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15% so với tháng trước
            </p>
          </div>
        </div>

        {/* Campaign Table */}
        <div className="bg-[#1a1225] rounded-xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
            <h2 className="text-lg font-bold">Danh sách chiến dịch</h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên chiến dịch..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-gray-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Tên chiến dịch / Điều kiện AI</th>
                  <th className="px-6 py-4 text-left font-medium">Mã voucher</th>
                  <th className="px-6 py-4 text-left font-medium">Đã phát</th>
                  <th className="px-6 py-4 text-left font-medium">Tỷ lệ sử dụng</th>
                  <th className="px-6 py-4 text-left font-medium">Doanh thu</th>
                  <th className="px-6 py-4 text-left font-medium">Trạng thái</th>
                  <th className="px-6 py-4 text-left font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCampaigns.map((campaign) => {
                  const usageRate = campaign.issued > 0 
                    ? Math.round((campaign.used / campaign.issued) * 100) 
                    : 0;
                  const status = statusLabels[campaign.status];
                  
                  return (
                    <tr key={campaign.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">{campaign.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Sparkles className="w-3 h-3 text-accent" />
                            Sau khi dùng AI Try-on
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-mono">
                          {campaign.code}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-white">{campaign.issued.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-white/10 h-1.5 rounded-full">
                            <div 
                              className="bg-accent h-full rounded-full" 
                              style={{ width: `${usageRate}%` }} 
                            />
                          </div>
                          <span className="text-white">{usageRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">{formatCurrency(campaign.revenue).replace('₫', 'đ')}</td>
                      <td className="px-6 py-4">
                        <span className={cn('px-2 py-1 rounded text-xs font-medium', status.class)}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white/10 rounded transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-gray-400" />
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
            <span>Hiển thị 4/4 chiến dịch</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/10">Trước</button>
              <button className="px-3 py-1 rounded bg-accent text-white">1</button>
              <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/10">Sau</button>
            </div>
          </div>
        </div>

        {/* AI Tip */}
        <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl p-6 border border-accent/30 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-white mb-1">Mẹo tối ưu: Kết hợp AI Try-on</h3>
            <p className="text-gray-300 text-sm">
              Dữ liệu cho thấy voucher được cấp ngay sau khi người dùng thực hiện <span className="text-accent font-medium">thử đồ ảo (Virtual Try-on)</span> có tỷ lệ chuyển đổi cao hơn <span className="font-bold text-white">24%</span> so với voucher truyền thống. Hãy cân nhắc thiết lập điều kiện này cho chiến dịch tiếp theo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

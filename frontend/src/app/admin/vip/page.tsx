/**
 * Admin VIP Management - Fashion AI
 * 
 * Quản lý VIP với API integration
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Crown, 
  Users, 
  Gift, 
  TrendingUp, 
  ChevronRight, 
  Loader2, 
  RefreshCw,
  Search,
  Star,
  DollarSign
} from 'lucide-react';
import { 
  useAdminVIPStats, 
  useAdminVIPMembers, 
  useAdminVIPActivity,
  useAdjustPoints
} from '@/hooks/useVIP';
import { toastSuccess, toastError } from '@/stores';

const tierColors: Record<string, string> = {
  Platinum: 'bg-purple-100 text-purple-600',
  Gold: 'bg-amber-100 text-amber-600',
  Silver: 'bg-gray-100 text-gray-600',
  Bronze: 'bg-orange-100 text-orange-600',
};

export default function AdminVIP() {
  const [tierFilter, setTierFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [adjustingPoints, setAdjustingPoints] = useState<string | null>(null);
  const [pointsAmount, setPointsAmount] = useState(0);
  const [pointsReason, setPointsReason] = useState('');

  const { data: stats, isLoading: statsLoading, refetch } = useAdminVIPStats();
  const { data: members, isLoading: membersLoading } = useAdminVIPMembers({
    tier: tierFilter || undefined,
    search: searchQuery || undefined,
  });
  const { data: activities } = useAdminVIPActivity();
  const adjustPoints = useAdjustPoints();

  const handleAdjustPoints = async (userId: string) => {
    if (!pointsAmount || !pointsReason) {
      toastError('Lỗi', 'Vui lòng nhập số điểm và lý do');
      return;
    }

    try {
      await adjustPoints.mutateAsync({ userId, points: pointsAmount, reason: pointsReason });
      toastSuccess('Thành công', 'Đã điều chỉnh điểm');
      setAdjustingPoints(null);
      setPointsAmount(0);
      setPointsReason('');
    } catch {
      toastError('Lỗi', 'Không thể điều chỉnh điểm');
    }
  };

  const formatPrice = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(0) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
    return value.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Quản Lý VIP</h1>
          </div>
          <button 
            onClick={() => refetch()}
            className="size-10 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-secondary-100"
          >
            <RefreshCw className="size-5 text-text-muted" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        {statsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Crown className="size-5 text-purple-600" />
                </div>
                <p className="text-sm text-text-muted">Platinum</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.platinumCount}</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Crown className="size-5 text-amber-600" />
                </div>
                <p className="text-sm text-text-muted">Gold</p>
              </div>
              <p className="text-2xl font-bold text-amber-600">{stats.goldCount}</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <DollarSign className="size-5 text-green-600" />
                </div>
                <p className="text-sm text-text-muted">Doanh thu VIP tháng</p>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-green-600">{formatPrice(stats.monthlyRevenue)}</p>
                <span className="text-sm text-green-500">+{stats.revenueChange}%</span>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Star className="size-5 text-blue-600" />
                </div>
                <p className="text-sm text-text-muted">Điểm đã đổi</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">{formatPrice(stats.totalPointsRedeemed)}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Members List */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between gap-4">
              <h3 className="font-bold text-text-main">Danh Sách Thành Viên VIP</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary w-40"
                  />
                </div>
                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Tất cả hạng</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Bronze">Bronze</option>
                </select>
              </div>
            </div>

            {membersLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="divide-y divide-border">
                {members?.items.map((member) => (
                  <div key={member.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {member.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-text-main">{member.userName}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierColors[member.tier]}`}>
                              {member.tier}
                            </span>
                          </div>
                          <p className="text-sm text-text-muted">{member.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">{member.points.toLocaleString()} điểm</p>
                        <p className="text-xs text-text-muted">Từ {formatDate(member.memberSince)}</p>
                      </div>
                    </div>

                    {/* Points adjustment */}
                    {adjustingPoints === member.userId ? (
                      <div className="mt-3 p-3 bg-secondary-50 rounded-lg flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="+/- điểm"
                          value={pointsAmount || ''}
                          onChange={(e) => setPointsAmount(Number(e.target.value))}
                          className="w-24 px-3 py-2 border border-border rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Lý do..."
                          value={pointsReason}
                          onChange={(e) => setPointsReason(e.target.value)}
                          className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                        />
                        <button 
                          onClick={() => handleAdjustPoints(member.userId)}
                          disabled={adjustPoints.isPending}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-sm disabled:opacity-50"
                        >
                          {adjustPoints.isPending ? <Loader2 className="size-4 animate-spin" /> : 'Lưu'}
                        </button>
                        <button 
                          onClick={() => setAdjustingPoints(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setAdjustingPoints(member.userId)}
                        className="mt-2 text-sm text-primary hover:underline"
                      >
                        Điều chỉnh điểm
                      </button>
                    )}
                  </div>
                ))}

                {(!members || members.items.length === 0) && (
                  <div className="text-center py-16">
                    <Users className="size-12 text-text-muted mx-auto mb-4" />
                    <p className="text-text-muted">Không có thành viên VIP</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {members && members.meta.totalPages > 1 && (
              <div className="p-4 border-t border-border text-center text-sm text-text-muted">
                Trang {members.meta.page} / {members.meta.totalPages} ({members.meta.total} thành viên)
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <h3 className="font-bold text-text-main mb-4">Quản Lý Nhanh</h3>
              <div className="space-y-3">
                <Link href="/admin/vip/tiers" className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Crown className="size-5 text-purple-600" />
                    <span className="font-medium text-text-main">Cấu hình hạng thành viên</span>
                  </div>
                  <ChevronRight className="size-5 text-text-muted" />
                </Link>
                <Link href="/admin/vip/rewards" className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Gift className="size-5 text-pink-600" />
                    <span className="font-medium text-text-main">Quản lý phần thưởng</span>
                  </div>
                  <ChevronRight className="size-5 text-text-muted" />
                </Link>
                <Link href="/admin/vip/points" className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="size-5 text-green-600" />
                    <span className="font-medium text-text-main">Cấu hình quy đổi điểm</span>
                  </div>
                  <ChevronRight className="size-5 text-text-muted" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <h3 className="font-bold text-text-main mb-4">Hoạt Động Gần Đây</h3>
              {activities && activities.length > 0 ? (
                <div className="space-y-3">
                  {activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-xl">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text-main">{activity.memberName}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierColors[activity.tier]}`}>
                            {activity.tier}
                          </span>
                        </div>
                        <p className="text-sm text-text-muted">{activity.description}</p>
                      </div>
                      <span className="text-xs text-text-muted">{formatDate(activity.createdAt)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-text-muted py-4">Chưa có hoạt động</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

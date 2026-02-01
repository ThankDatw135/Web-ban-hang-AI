/**
 * Fashion AI - Admin AI Jobs Monitoring
 * 
 * Theo dõi các AI jobs (virtual try-on, stylist)
 */

'use client';

import { cn } from '@/lib/utils';

// Mock AI jobs
const mockJobs = [
  { id: 'JOB-001', type: 'try_on', user: 'Nguyễn Văn A', status: 'completed', duration: '12s', created: '5 phút trước' },
  { id: 'JOB-002', type: 'try_on', user: 'Trần Thị B', status: 'processing', duration: '-', created: '2 phút trước' },
  { id: 'JOB-003', type: 'stylist', user: 'Lê Văn C', status: 'completed', duration: '3s', created: '10 phút trước' },
  { id: 'JOB-004', type: 'try_on', user: 'Phạm Thị D', status: 'failed', duration: '-', created: '15 phút trước' },
  { id: 'JOB-005', type: 'try_on', user: 'Hoàng Văn E', status: 'queued', duration: '-', created: '1 phút trước' },
];

const statusConfig: Record<string, { label: string; class: string; icon: string }> = {
  completed: { label: 'Hoàn thành', class: 'bg-green-100 text-green-700', icon: 'check_circle' },
  processing: { label: 'Đang xử lý', class: 'bg-blue-100 text-blue-700', icon: 'sync' },
  queued: { label: 'Đang chờ', class: 'bg-gray-100 text-gray-700', icon: 'schedule' },
  failed: { label: 'Thất bại', class: 'bg-red-100 text-red-700', icon: 'error' },
};

const typeConfig: Record<string, { label: string; icon: string }> = {
  try_on: { label: 'Virtual Try-on', icon: 'view_in_ar' },
  stylist: { label: 'AI Stylist', icon: 'smart_toy' },
};

// Stats
const stats = [
  { label: 'Đang xử lý', value: '3', color: 'text-blue-600' },
  { label: 'Hoàn thành hôm nay', value: '156', color: 'text-green-600' },
  { label: 'Thất bại', value: '2', color: 'text-red-600' },
  { label: 'Thời gian TB', value: '8.5s', color: 'text-gray-600' },
];

export default function AdminAIJobsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">AI Jobs</h1>
        <p className="text-gray-600">Theo dõi các tác vụ AI</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
            <p className={cn('text-3xl font-bold', stat.color)}>{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Jobs table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold">Jobs gần đây</h2>
          <button className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Làm mới
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-sm">ID</th>
              <th className="text-left p-4 font-semibold text-sm">Loại</th>
              <th className="text-left p-4 font-semibold text-sm">User</th>
              <th className="text-left p-4 font-semibold text-sm">Trạng thái</th>
              <th className="text-left p-4 font-semibold text-sm">Thời gian</th>
              <th className="text-left p-4 font-semibold text-sm">Tạo lúc</th>
              <th className="text-center p-4 font-semibold text-sm">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">{job.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent text-[18px]">{typeConfig[job.type].icon}</span>
                    <span className="text-sm">{typeConfig[job.type].label}</span>
                  </div>
                </td>
                <td className="p-4">{job.user}</td>
                <td className="p-4">
                  <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold', statusConfig[job.status].class)}>
                    <span className="material-symbols-outlined text-[14px]">{statusConfig[job.status].icon}</span>
                    {statusConfig[job.status].label}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{job.duration}</td>
                <td className="p-4 text-gray-600">{job.created}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    {job.status === 'failed' && (
                      <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">replay</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

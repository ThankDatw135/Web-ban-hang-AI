/**
 * Fashion AI - Admin AI Jobs
 * 
 * Quản lý các tác vụ AI (Virtual Try-On)
 */

'use client';

import { Sparkles, Eye, RefreshCw, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';

// Mock AI jobs data
const aiJobs = [
  { id: 'AI-001', user: 'Nguyễn Văn A', type: 'try-on', status: 'completed', createdAt: '12:30 02/02/2026', duration: '2.5s' },
  { id: 'AI-002', user: 'Trần Thị B', type: 'try-on', status: 'processing', createdAt: '12:28 02/02/2026', duration: '-' },
  { id: 'AI-003', user: 'Lê Văn C', type: 'try-on', status: 'completed', createdAt: '12:25 02/02/2026', duration: '3.1s' },
  { id: 'AI-004', user: 'Phạm Thị D', type: 'try-on', status: 'failed', createdAt: '12:20 02/02/2026', duration: '-' },
  { id: 'AI-005', user: 'Hoàng Văn E', type: 'try-on', status: 'queued', createdAt: '12:35 02/02/2026', duration: '-' },
];

// Status config
const statusConfig: Record<string, { label: string; color: string; icon: typeof Sparkles }> = {
  completed: { label: 'Hoàn thành', color: 'bg-green-500/10 text-green-500', icon: CheckCircle },
  processing: { label: 'Đang xử lý', color: 'bg-blue-500/10 text-blue-500', icon: Loader2 },
  queued: { label: 'Chờ', color: 'bg-yellow-500/10 text-yellow-500', icon: Clock },
  failed: { label: 'Lỗi', color: 'bg-red-500/10 text-red-500', icon: XCircle },
};

export default function AdminAIJobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Jobs</h1>
        <button className="btn-outline">
          <RefreshCw className="w-5 h-5" />
          Làm mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-xl font-bold">12,345</p>
            <p className="text-xs text-secondary">Tổng requests</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-xl font-bold">98.5%</p>
            <p className="text-xs text-secondary">Thành công</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xl font-bold">5</p>
            <p className="text-xs text-secondary">Đang xử lý</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold">2.8s</p>
            <p className="text-xs text-secondary">Thời gian TB</p>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary bg-gray-50 dark:bg-[#2c2822]">
                <th className="p-4 font-medium">Job ID</th>
                <th className="p-4 font-medium">Người dùng</th>
                <th className="p-4 font-medium">Loại</th>
                <th className="p-4 font-medium">Trạng thái</th>
                <th className="p-4 font-medium">Thời gian</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {aiJobs.map((job) => {
                const status = statusConfig[job.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={job.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium font-mono text-sm">{job.id}</td>
                    <td className="p-4 text-sm">{job.user}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold">
                        Virtual Try-On
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${status.color}`}>
                        <StatusIcon className={`w-3 h-3 ${job.status === 'processing' ? 'animate-spin' : ''}`} />
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-secondary">{job.createdAt}</td>
                    <td className="p-4 text-sm font-mono">{job.duration}</td>
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

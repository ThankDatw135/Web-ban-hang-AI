/**
 * Admin Data Management - Fashion AI
 */

'use client';

import Link from 'next/link';
import { ArrowLeft, Database, Download, Upload, Trash2, Archive, Clock, HardDrive } from 'lucide-react';

const dataStats = [
  { label: 'Dung lượng DB', value: '2.4 GB', icon: Database, color: 'bg-blue-50 text-blue-600' },
  { label: 'Backup gần nhất', value: '2 giờ trước', icon: Clock, color: 'bg-green-50 text-green-600' },
  { label: 'Bản backup', value: '15', icon: Archive, color: 'bg-purple-50 text-purple-600' },
  { label: 'Dung lượng media', value: '45 GB', icon: HardDrive, color: 'bg-amber-50 text-amber-600' },
];

const recentBackups = [
  { id: '1', name: 'backup_20240130_1400.sql', size: '2.4 GB', date: '30/01/2024 14:00', type: 'full' },
  { id: '2', name: 'backup_20240129_1400.sql', size: '2.3 GB', date: '29/01/2024 14:00', type: 'full' },
  { id: '3', name: 'backup_20240128_1400.sql', size: '2.3 GB', date: '28/01/2024 14:00', type: 'full' },
];

export default function AdminData() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
            <ArrowLeft className="size-5 text-text-muted" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Quản Lý Dữ Liệu</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dataStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-border p-4 flex items-center gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                  <p className="text-xl font-bold text-text-main">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <section className="bg-white rounded-2xl border border-border p-6 mb-6">
          <h2 className="font-bold text-text-main mb-4">Thao Tác</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
              <Download className="size-6 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-text-main">Backup ngay</span>
            </button>
            <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
              <Upload className="size-6 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-text-main">Khôi phục</span>
            </button>
            <button className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors text-center">
              <Archive className="size-6 text-amber-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-text-main">Export data</span>
            </button>
            <button className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-center">
              <Trash2 className="size-6 text-red-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-text-main">Xóa cache</span>
            </button>
          </div>
        </section>

        {/* Recent Backups */}
        <section className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-bold text-text-main mb-4">Bản Backup Gần Đây</h2>
          <div className="space-y-3">
            {recentBackups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Database className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-text-main">{backup.name}</p>
                    <p className="text-sm text-text-muted">{backup.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-muted">{backup.size}</span>
                  <button className="px-3 py-1 bg-white border border-border rounded-lg text-sm font-medium hover:border-primary">
                    Tải xuống
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/**
 * Fashion AI - Admin AI Jobs
 */

'use client';

import { useState } from 'react';
import { 
  Bot, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { useAllAIJobs } from '@/hooks/use-ai';
import { formatDate } from '@/lib/utils/format';
import Link from 'next/link';

export default function AdminAIJobsPage() {
  const { data: jobs, isLoading } = useAllAIJobs(50);
  
  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-96">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
      );
  }

  const jobList = jobs || [];

  return (
    <div className="space-y-6">
      <div>
           <h1 className="text-2xl font-bold">AI Jobs Monitor</h1>
           <p className="text-secondary">Theo dõi trạng thái xử lý các tác vụ AI</p>
      </div>

      <div className="bg-white dark:bg-[#1e1a14] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                          <th className="p-4 font-medium text-secondary text-sm">Job ID</th>
                          <th className="p-4 font-medium text-secondary text-sm">Loại</th>
                          <th className="p-4 font-medium text-secondary text-sm">Trạng thái</th>
                          <th className="p-4 font-medium text-secondary text-sm">Input/Output</th>
                          <th className="p-4 font-medium text-secondary text-sm">Thời gian</th>
                      </tr>
                  </thead>
                  <tbody>
                      {jobList.length > 0 ? jobList.map((job) => (
                          <tr key={job.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="p-4 font-mono text-xs">
                                  {job.id.slice(0, 8)}...
                              </td>
                              <td className="p-4">
                                  <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                      {job.type}
                                  </span>
                              </td>
                              <td className="p-4">
                                  <div className="flex items-center gap-1">
                                      {job.status === 'COMPLETED' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                      {job.status === 'FAILED' && <XCircle className="w-4 h-4 text-red-500" />}
                                      {job.status === 'PROCESSING' && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
                                      {job.status === 'PENDING' && <Clock className="w-4 h-4 text-yellow-500" />}
                                      <span className="text-sm font-medium">{job.status}</span>
                                  </div>
                              </td>
                              <td className="p-4 text-xs">
                                  {job.resultUrl ? (
                                      <a href={job.resultUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                                          Xem kết quả <ExternalLink className="w-3 h-3" />
                                      </a>
                                  ) : (
                                      <span className="text-secondary">-</span>
                                  )}
                                  {job.errorMessage && (
                                     <p className="text-red-500 mt-1 max-w-xs truncate" title={job.errorMessage}>
                                         Lỗi: {job.errorMessage}
                                     </p>
                                  )}
                              </td>
                              <td className="p-4 text-sm text-secondary">
                                  {formatDate(job.createdAt)}
                              </td>
                          </tr>
                      )) : (
                          <tr>
                              <td colSpan={5} className="p-8 text-center text-secondary">
                                  Chưa có job nào.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}

/**
 * Admin AI Jobs API - Frontend client
 */

import apiClient from '../../api-client';

export interface AIJob {
  id: string;
  type: 'VIRTUAL_TRYON' | 'SIZE_RECOMMENDATION' | 'CHAT';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  product?: {
    id: string;
    name: string;
  };
  inputData: any;
  resultData?: any;
  resultUrl?: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

export interface AIJobsResponse {
  data: AIJob[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AIJobStats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  today: number;
  byType: { type: string; count: number }[];
}

/**
 * Get all AI jobs (admin)
 */
export async function getAIJobs(params?: {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
}): Promise<AIJobsResponse> {
  const response = await apiClient.get('/admin/ai-jobs', { params });
  return response.data;
}

/**
 * Get AI job by ID
 */
export async function getAIJobById(id: string): Promise<AIJob> {
  const response = await apiClient.get(`/admin/ai-jobs/${id}`);
  return response.data;
}

/**
 * Get AI job statistics
 */
export async function getAIJobStats(): Promise<AIJobStats> {
  const response = await apiClient.get('/admin/ai-jobs/stats');
  return response.data;
}

/**
 * Cancel an AI job
 */
export async function cancelAIJob(id: string): Promise<{ message: string }> {
  const response = await apiClient.delete(`/admin/ai-jobs/${id}`);
  return response.data;
}

/**
 * Fashion AI - Admin Support API Service
 * 
 * API calls cho quản lý ticket hỗ trợ
 */

import apiClient from '../api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/api';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  assignedTo?: string;
  assignedToName?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketFilter {
  page?: number;
  limit?: number;
  status?: TicketStatus;
  priority?: TicketPriority;
  search?: string;
}

export interface TicketStats {
  open: number;
  inProgress: number;
  resolved: number;
  avgResponseTime: string;
}

/**
 * Lấy danh sách tickets (Admin)
 */
export async function getTickets(filter?: TicketFilter): Promise<PaginatedResponse<SupportTicket>> {
  const params = new URLSearchParams();
  
  if (filter?.page) params.set('page', String(filter.page));
  if (filter?.limit) params.set('limit', String(filter.limit));
  if (filter?.status) params.set('status', filter.status);
  if (filter?.priority) params.set('priority', filter.priority);
  if (filter?.search) params.set('search', filter.search);
  
  const response = await apiClient.get<ApiResponse<PaginatedResponse<SupportTicket>>>(
    `/admin/support/tickets?${params.toString()}`
  );
  return response.data.data;
}

/**
 * Lấy chi tiết ticket
 */
export async function getTicketById(id: string): Promise<SupportTicket> {
  const response = await apiClient.get<ApiResponse<SupportTicket>>(`/admin/support/tickets/${id}`);
  return response.data.data;
}

/**
 * Cập nhật trạng thái ticket
 */
export async function updateTicketStatus(id: string, status: TicketStatus): Promise<SupportTicket> {
  const response = await apiClient.patch<ApiResponse<SupportTicket>>(`/admin/support/tickets/${id}`, { status });
  return response.data.data;
}

/**
 * Phân công ticket
 */
export async function assignTicket(id: string, assignedTo: string): Promise<SupportTicket> {
  const response = await apiClient.patch<ApiResponse<SupportTicket>>(`/admin/support/tickets/${id}/assign`, { assignedTo });
  return response.data.data;
}

/**
 * Lấy thống kê tickets
 */
export async function getTicketStats(): Promise<TicketStats> {
  const response = await apiClient.get<ApiResponse<TicketStats>>('/admin/support/stats');
  return response.data.data;
}

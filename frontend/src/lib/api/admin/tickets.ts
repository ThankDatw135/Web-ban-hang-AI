/**
 * Admin Tickets API - Frontend client
 */

import apiClient from '../../api-client';

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: 'TECHNICAL_AI' | 'PAYMENT' | 'ORDER' | 'PRODUCT' | 'ACCOUNT' | 'OTHER';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'PROCESSING' | 'RESOLVED' | 'CLOSED';
  assignedTo?: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  _count?: {
    replies: number;
  };
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface TicketReply {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface TicketsResponse {
  data: SupportTicket[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TicketStats {
  open: number;
  processing: number;
  resolved: number;
  today: number;
  highPriority: number;
}

/**
 * Get all tickets (admin)
 */
export async function getTickets(params?: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
}): Promise<TicketsResponse> {
  const response = await apiClient.get('/admin/tickets', { params });
  return response.data;
}

/**
 * Get ticket by ID
 */
export async function getTicketById(id: string): Promise<SupportTicket & { replies: TicketReply[] }> {
  const response = await apiClient.get(`/admin/tickets/${id}`);
  return response.data;
}

/**
 * Get ticket statistics
 */
export async function getTicketStats(): Promise<TicketStats> {
  const response = await apiClient.get('/admin/tickets/stats');
  return response.data;
}

/**
 * Update ticket status
 */
export async function updateTicketStatus(
  id: string,
  data: { status: string; assignedTo?: string }
): Promise<SupportTicket> {
  const response = await apiClient.patch(`/admin/tickets/${id}/status`, data);
  return response.data;
}

/**
 * Reply to ticket
 */
export async function replyToTicket(
  id: string,
  content: string
): Promise<TicketReply> {
  const response = await apiClient.post(`/admin/tickets/${id}/reply`, { content });
  return response.data;
}

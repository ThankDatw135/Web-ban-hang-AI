/**
 * Fashion AI - Admin Support Hooks
 * 
 * React Query hooks cho quản lý ticket hỗ trợ
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as supportApi from '@/lib/api/admin-support';
import type { TicketFilter, TicketStatus } from '@/lib/api/admin-support';

/**
 * Hook lấy danh sách tickets
 */
export function useTickets(filter?: TicketFilter) {
  return useQuery({
    queryKey: ['admin-tickets', filter],
    queryFn: () => supportApi.getTickets(filter),
  });
}

/**
 * Hook lấy chi tiết ticket
 */
export function useTicket(id: string) {
  return useQuery({
    queryKey: ['admin-ticket', id],
    queryFn: () => supportApi.getTicketById(id),
    enabled: !!id,
  });
}

/**
 * Hook lấy thống kê
 */
export function useTicketStats() {
  return useQuery({
    queryKey: ['admin-ticket-stats'],
    queryFn: supportApi.getTicketStats,
  });
}

/**
 * Hook cập nhật trạng thái ticket
 */
export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TicketStatus }) => 
      supportApi.updateTicketStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-tickets'] });
      queryClient.invalidateQueries({ queryKey: ['admin-ticket', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-ticket-stats'] });
    },
  });
}

/**
 * Hook phân công ticket
 */
export function useAssignTicket() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, assignedTo }: { id: string; assignedTo: string }) => 
      supportApi.assignTicket(id, assignedTo),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-tickets'] });
      queryClient.invalidateQueries({ queryKey: ['admin-ticket', id] });
    },
  });
}

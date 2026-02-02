/**
 * Admin Hooks - React Query hooks for admin features
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDashboardStats,
  getRevenueChart,
  getTopProducts,
  type DashboardStats,
  type RevenueChartData,
  type TopProduct,
} from '@/lib/api/admin/analytics';
import {
  getAIJobs,
  getAIJobById,
  getAIJobStats,
  cancelAIJob,
  type AIJob,
  type AIJobsResponse,
  type AIJobStats,
} from '@/lib/api/admin/ai-jobs';
import {
  getTickets,
  getTicketById,
  getTicketStats,
  updateTicketStatus,
  replyToTicket,
  type SupportTicket,
  type TicketsResponse,
  type TicketStats,
} from '@/lib/api/admin/tickets';
import {
  getCampaigns,
  getCampaignById,
  getCampaignStats,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  type Campaign,
  type CampaignsResponse,
  type CampaignStats,
} from '@/lib/api/admin/campaigns';

// ==========================================
// ANALYTICS HOOKS
// ==========================================

/**
 * Hook to fetch dashboard statistics
 */
export function useAdminDashboard() {
  return useQuery<DashboardStats>({
    queryKey: ['admin', 'dashboard'],
    queryFn: getDashboardStats,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Auto refresh every 5 minutes
  });
}

/**
 * Hook to fetch revenue chart data
 */
export function useRevenueChart(days = 7) {
  return useQuery<RevenueChartData[]>({
    queryKey: ['admin', 'revenue-chart', days],
    queryFn: () => getRevenueChart(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch top products
 */
export function useTopProducts(limit = 5) {
  return useQuery<TopProduct[]>({
    queryKey: ['admin', 'top-products', limit],
    queryFn: () => getTopProducts(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ==========================================
// AI JOBS HOOKS
// ==========================================

/**
 * Hook to fetch AI jobs list
 */
export function useAdminAIJobs(params?: {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
}) {
  return useQuery<AIJobsResponse>({
    queryKey: ['admin', 'ai-jobs', params],
    queryFn: () => getAIJobs(params),
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to fetch single AI job
 */
export function useAdminAIJob(id: string) {
  return useQuery<AIJob>({
    queryKey: ['admin', 'ai-jobs', id],
    queryFn: () => getAIJobById(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch AI job statistics
 */
export function useAdminAIJobStats() {
  return useQuery<AIJobStats>({
    queryKey: ['admin', 'ai-jobs', 'stats'],
    queryFn: getAIJobStats,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to cancel an AI job
 */
export function useCancelAIJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAIJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'ai-jobs'] });
    },
  });
}

// ==========================================
// TICKETS HOOKS
// ==========================================

/**
 * Hook to fetch tickets list
 */
export function useAdminTickets(params?: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
}) {
  return useQuery<TicketsResponse>({
    queryKey: ['admin', 'tickets', params],
    queryFn: () => getTickets(params),
    staleTime: 30 * 1000,
  });
}

/**
 * Hook to fetch single ticket
 */
export function useAdminTicket(id: string) {
  return useQuery<SupportTicket & { replies: any[] }>({
    queryKey: ['admin', 'tickets', id],
    queryFn: () => getTicketById(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch ticket statistics
 */
export function useAdminTicketStats() {
  return useQuery<TicketStats>({
    queryKey: ['admin', 'tickets', 'stats'],
    queryFn: getTicketStats,
    staleTime: 60 * 1000,
  });
}

/**
 * Hook to update ticket status
 */
export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { status: string; assignedTo?: string } }) =>
      updateTicketStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] });
    },
  });
}

/**
 * Hook to reply to ticket
 */
export function useReplyToTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      replyToTicket(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] });
    },
  });
}

// ==========================================
// CAMPAIGNS HOOKS
// ==========================================

/**
 * Hook to fetch campaigns list
 */
export function useAdminCampaigns(params?: {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
}) {
  return useQuery<CampaignsResponse>({
    queryKey: ['admin', 'campaigns', params],
    queryFn: () => getCampaigns(params),
    staleTime: 60 * 1000,
  });
}

/**
 * Hook to fetch single campaign
 */
export function useAdminCampaign(id: string) {
  return useQuery<Campaign>({
    queryKey: ['admin', 'campaigns', id],
    queryFn: () => getCampaignById(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch campaign statistics
 */
export function useAdminCampaignStats() {
  return useQuery<CampaignStats>({
    queryKey: ['admin', 'campaigns', 'stats'],
    queryFn: getCampaignStats,
    staleTime: 60 * 1000,
  });
}

/**
 * Hook to create campaign
 */
export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'campaigns'] });
    },
  });
}

/**
 * Hook to update campaign
 */
export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateCampaign>[1] }) =>
      updateCampaign(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'campaigns'] });
    },
  });
}

/**
 * Hook to delete campaign
 */
export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'campaigns'] });
    },
  });
}

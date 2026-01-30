/**
 * VIP & Loyalty API Hooks - Fashion AI
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

// ==================== TYPES ====================

export interface VIPMember {
  id: string;
  userId: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points: number;
  totalSpent: number;
  memberSince: string;
  nextTier?: string;
  pointsToNextTier?: number;
}

export interface VIPTier {
  id: string;
  name: string;
  minSpent: number;
  pointMultiplier: number;
  benefits: string[];
  color: string;
}

export interface VIPReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'voucher' | 'gift' | 'service';
  value?: number;
  expiresAt?: string;
  available: boolean;
}

export interface VIPActivity {
  id: string;
  type: 'points_earned' | 'points_redeemed' | 'tier_upgrade' | 'reward_claimed';
  description: string;
  points?: number;
  createdAt: string;
}

export interface VIPStats {
  totalMembers: number;
  platinumCount: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
  monthlyRevenue: number;
  totalPointsRedeemed: number;
  revenueChange: number;
}

// ==================== USER VIP HOOKS ====================

export function useVIPProfile() {
  return useQuery({
    queryKey: ['vip', 'profile'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: VIPMember }>('/user/vip');
      return response.data.data;
    },
  });
}

export function useVIPTiers() {
  return useQuery({
    queryKey: ['vip', 'tiers'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: VIPTier[] }>('/vip/tiers');
      return response.data.data;
    },
  });
}

export function useVIPRewards() {
  return useQuery({
    queryKey: ['vip', 'rewards'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: VIPReward[] }>('/vip/rewards');
      return response.data.data;
    },
  });
}

export function useVIPActivity(limit?: number) {
  return useQuery({
    queryKey: ['vip', 'activity', limit],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: VIPActivity[] }>(
        `/user/vip/activity${limit ? `?limit=${limit}` : ''}`
      );
      return response.data.data;
    },
  });
}

export function useRedeemReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rewardId: string) => {
      const response = await apiClient.post('/user/vip/redeem', { rewardId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vip', 'profile'] });
      queryClient.invalidateQueries({ queryKey: ['vip', 'activity'] });
    },
  });
}

export function useBookVIPService() {
  return useMutation({
    mutationFn: async (data: { serviceId: string; date: string; notes?: string }) => {
      const response = await apiClient.post('/user/vip/book-service', data);
      return response.data;
    },
  });
}

// ==================== ADMIN VIP HOOKS ====================

export function useAdminVIPStats() {
  return useQuery({
    queryKey: ['admin', 'vip', 'stats'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: VIPStats }>('/admin/vip/stats');
      return response.data.data;
    },
  });
}

export function useAdminVIPMembers(filters?: { tier?: string; search?: string; page?: number }) {
  return useQuery({
    queryKey: ['admin', 'vip', 'members', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.tier) params.append('tier', filters.tier);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.page) params.append('page', String(filters.page));

      const response = await apiClient.get<{ 
        success: boolean; 
        data: { 
          items: (VIPMember & { userName: string; email: string })[];
          meta: { total: number; page: number; totalPages: number };
        } 
      }>(`/admin/vip/members?${params}`);
      return response.data.data;
    },
  });
}

export function useAdminVIPActivity() {
  return useQuery({
    queryKey: ['admin', 'vip', 'activity'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: (VIPActivity & { memberName: string; tier: string })[] }>(
        '/admin/vip/activity'
      );
      return response.data.data;
    },
  });
}

export function useUpdateVIPTier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tierId, data }: { tierId: string; data: Partial<VIPTier> }) => {
      const response = await apiClient.patch(`/admin/vip/tiers/${tierId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vip', 'tiers'] });
    },
  });
}

export function useManageVIPReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<VIPReward> & { id?: string }) => {
      if (data.id) {
        const response = await apiClient.patch(`/admin/vip/rewards/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/vip/rewards', data);
        return response.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vip', 'rewards'] });
    },
  });
}

export function useAdjustPoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, points, reason }: { userId: string; points: number; reason: string }) => {
      const response = await apiClient.post('/admin/vip/adjust-points', { userId, points, reason });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'vip', 'members'] });
    },
  });
}

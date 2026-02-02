/**
 * Fashion AI - AI Hooks
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as aiApi from '@/lib/api/ai';
import { toast } from 'sonner';

// Virtual Try-On
export function useVirtualTryOn() {
  return useMutation({
    mutationFn: aiApi.virtualTryOn,
    onSuccess: (data) => {
      toast.success('Đang xử lý thử đồ ảo...');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi thử đồ');
    },
  });
}

export function useAIJob(id: string | null) {
  return useQuery({
    queryKey: ['ai-job', id],
    queryFn: () => aiApi.getAIJobStatus(id!),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && (data.status === 'COMPLETED' || data.status === 'FAILED')) {
        return false;
      }
      return 2000; // Poll every 2s
    },
  });
}

// Size Recommend
export function useSizeRecommend() {
  return useMutation({
    mutationFn: aiApi.recommendSize,
    onError: (error: any) => {
      toast.error('Không thể lấy gợi ý size');
    },
  });
}

// Chat
export function useChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aiApi.sendChatMessage,
    onSuccess: (data) => {
      queryClient.setQueryData(['chat-history'], (old: any) => {
        return old ? [...old, data] : [data];
      });
    },
  });
}

// Admin Hook
export function useAllAIJobs(limit = 20) {
  return useQuery({
    queryKey: ['admin-ai-jobs', limit],
    queryFn: () => aiApi.getAIJobs(limit),
  });
}

export function useChatHistory() {
  return useQuery({
    queryKey: ['chat-history'],
    queryFn: aiApi.getChatHistory,
  });
}

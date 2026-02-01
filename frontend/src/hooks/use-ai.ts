/**
 * Fashion AI - AI Hooks
 * 
 * React Query hooks cho AI features
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as aiApi from '@/lib/api/ai';
import type { VirtualTryOnRequest, AIChatRequest } from '@/types/api';

/**
 * Hook yêu cầu thử đồ ảo
 */
export function useVirtualTryOn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VirtualTryOnRequest) => aiApi.requestVirtualTryOn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiJobs'] });
    },
  });
}

/**
 * Hook yêu cầu gợi ý size
 */
export function useSizeRecommendation() {
  return useMutation({
    mutationFn: (productId: string) => aiApi.requestSizeRecommendation(productId),
  });
}

/**
 * Hook gửi tin nhắn chat AI
 */
export function useAIChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AIChatRequest) => aiApi.sendChatMessage(data),
    onSuccess: (_, variables) => {
      if (variables.sessionId) {
        queryClient.invalidateQueries({ queryKey: ['chatHistory', variables.sessionId] });
      }
    },
  });
}

/**
 * Hook lấy trạng thái job AI (polling)
 */
export function useAIJobStatus(jobId: string | null, options?: { refetchInterval?: number }) {
  return useQuery({
    queryKey: ['aiJob', jobId],
    queryFn: () => aiApi.getJobStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: options?.refetchInterval ?? 2000, // Poll every 2s
  });
}

/**
 * Hook lấy lịch sử chat
 */
export function useChatHistory(sessionId: string) {
  return useQuery({
    queryKey: ['chatHistory', sessionId],
    queryFn: () => aiApi.getChatHistory(sessionId),
    enabled: !!sessionId,
  });
}

/**
 * Hook lấy danh sách phiên chat
 */
export function useChatSessions() {
  return useQuery({
    queryKey: ['chatSessions'],
    queryFn: aiApi.getChatSessions,
  });
}

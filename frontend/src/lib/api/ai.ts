/**
 * Fashion AI - AI API Service
 * 
 * Các functions gọi API AI
 */

import apiClient from '../api-client';
import type { 
  AIJob,
  VirtualTryOnRequest,
  AIChatRequest,
  ChatSession,
  ChatMessage,
  ApiResponse 
} from '@/types/api';

/**
 * Yêu cầu thử đồ ảo
 */
export async function requestVirtualTryOn(data: VirtualTryOnRequest): Promise<AIJob> {
  const response = await apiClient.post<ApiResponse<AIJob>>('/ai/tryon', data);
  return response.data.data;
}

/**
 * Yêu cầu gợi ý kích thước
 */
export async function requestSizeRecommendation(productId: string): Promise<AIJob> {
  const response = await apiClient.post<ApiResponse<AIJob>>('/ai/size', { productId });
  return response.data.data;
}

/**
 * Gửi tin nhắn chat với AI
 */
export async function sendChatMessage(data: AIChatRequest): Promise<ChatMessage> {
  const response = await apiClient.post<ApiResponse<ChatMessage>>('/ai/chat', data);
  return response.data.data;
}

/**
 * Lấy trạng thái job AI
 */
export async function getJobStatus(jobId: string): Promise<AIJob> {
  const response = await apiClient.get<ApiResponse<AIJob>>(`/ai/jobs/${jobId}`);
  return response.data.data;
}

/**
 * Lấy lịch sử chat
 */
export async function getChatHistory(sessionId: string): Promise<ChatMessage[]> {
  const response = await apiClient.get<ApiResponse<ChatMessage[]>>(`/ai/chat/${sessionId}`);
  return response.data.data;
}

/**
 * Lấy danh sách phiên chat
 */
export async function getChatSessions(): Promise<ChatSession[]> {
  const response = await apiClient.get<ApiResponse<ChatSession[]>>('/ai/chat/sessions');
  return response.data.data;
}

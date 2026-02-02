/**
 * Fashion AI - AI API
 */

import apiClient from '../api-client';
import { ApiResponse, AIJob, VirtualTryOnRequest, AIChatRequest, ChatSession } from '@/types/api';

// Virtual Try-On
export async function virtualTryOn(data: VirtualTryOnRequest): Promise<AIJob> {
  const response = await apiClient.post<ApiResponse<AIJob>>('/ai/try-on', data);
  return response.data.data;
}

export async function getAIJobStatus(id: string): Promise<AIJob> {
  const response = await apiClient.get<ApiResponse<AIJob>>(`/ai/jobs/${id}`);
  return response.data.data;
}

// Size Recommendation
export interface SizeRecommendRequest {
  productId: string;
  height: number;
  weight: number;
}

export interface SizeRecommendResponse {
  recommendedSize: string;
  confidence: number;
  details: string;
}

export async function recommendSize(data: SizeRecommendRequest): Promise<SizeRecommendResponse> {
  const response = await apiClient.post<ApiResponse<SizeRecommendResponse>>('/ai/size-recommend', data);
  return response.data.data;
}

// AI Chat
export async function sendChatMessage(data: AIChatRequest): Promise<ChatSession> {
  const response = await apiClient.post<ApiResponse<ChatSession>>('/ai/chat', data);
  return response.data.data;
}

export async function getChatHistory(): Promise<ChatSession[]> {
  const response = await apiClient.get<ApiResponse<ChatSession[]>>('/ai/chat/history');
  return response.data.data;
}

// Admin
export async function getAIJobs(limit = 20): Promise<AIJob[]> {
  const response = await apiClient.get<ApiResponse<AIJob[]>>(`/admin/ai-jobs?limit=${limit}`);
  return response.data.data;
}

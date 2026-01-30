/**
 * AI API Hooks - Fashion AI
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { 
  TryOnRequest, 
  TryOnResponse,
  TryOnResult,
  SizeRecommendRequest,
  SizeRecommendResponse,
  ChatRequest,
  ChatResponse,
  ChatSession,
  AIJob
} from '@/types';

// Virtual Try-On
export function useTryOn() {
  return useMutation({
    mutationFn: async ({ productId, userImage, useModelImage, options }: TryOnRequest & { userImage: File | string; useModelImage?: boolean }) => {
      if (typeof userImage === 'string' || useModelImage) {
        // Send as JSON for base64 string or model selection
        const response = await apiClient.post<TryOnResponse & { data: { outputImage?: string } }>('/ai/try-on', {
          productId,
          userImage,
          useModelImage,
          options,
        });
        return response.data.data;
      } else {
        // Send as FormData for File upload
        const formData = new FormData();
        formData.append('userImage', userImage);
        formData.append('productId', productId);
        if (options) {
          formData.append('options', JSON.stringify(options));
        }

        const response = await apiClient.post<TryOnResponse>('/ai/try-on', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data;
      }
    },
  });
}

// Get try-on job status
export function useTryOnJob(jobId: string) {
  return useQuery({
    queryKey: ['ai-job', jobId],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: TryOnResult }>(`/ai/jobs/${jobId}`);
      return response.data.data;
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Stop polling when completed or failed
      if (data?.status === 'COMPLETED' || data?.status === 'FAILED') {
        return false;
      }
      return 2000; // Poll every 2 seconds
    },
  });
}

// Get try-on history
export function useTryOnHistory(page: number = 1) {
  return useQuery({
    queryKey: ['try-on-history', page],
    queryFn: async () => {
      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: AIJob[]; meta: { total: number; page: number } } 
      }>(`/ai/try-on/history?page=${page}`);
      return response.data.data;
    },
  });
}

// Size Recommendation
export function useSizeRecommend() {
  return useMutation({
    mutationFn: async (data: SizeRecommendRequest) => {
      const response = await apiClient.post<SizeRecommendResponse>('/ai/size-recommend', data);
      return response.data.data;
    },
  });
}

// AI Chat - Send message
export function useAIChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ChatRequest) => {
      const response = await apiClient.post<ChatResponse>('/ai/chat', data);
      return response.data.data;
    },
    onSuccess: (data) => {
      // Update chat sessions cache
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
      queryClient.invalidateQueries({ queryKey: ['chat-session', data.sessionId] });
    },
  });
}

// Get chat sessions
export function useChatSessions() {
  return useQuery({
    queryKey: ['chat-sessions'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: ChatSession[] }>('/ai/chat/sessions');
      return response.data.data;
    },
  });
}

// Get chat session with messages
export function useChatSession(sessionId: string) {
  return useQuery({
    queryKey: ['chat-session', sessionId],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: ChatSession }>(`/ai/chat/sessions/${sessionId}`);
      return response.data.data;
    },
    enabled: !!sessionId,
  });
}

// Body scan
export function useBodyScan() {
  return useMutation({
    mutationFn: async (image: File) => {
      const formData = new FormData();
      formData.append('image', image);

      const response = await apiClient.post<{ 
        success: boolean; 
        data: { 
          height?: number; 
          chest?: number; 
          waist?: number; 
          hips?: number; 
          confidence: number 
        } 
      }>('/ai/body-scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    },
  });
}

// Style recommendation
export function useStyleRecommend() {
  return useMutation({
    mutationFn: async (preferences: { style?: string; occasion?: string; budget?: number }) => {
      const response = await apiClient.post('/ai/style-recommend', preferences);
      return response.data.data;
    },
  });
}

// Gift suggestion
export function useGiftSuggest() {
  return useMutation({
    mutationFn: async (data: { 
      recipient: string; 
      occasion: string; 
      ageRange?: string; 
      gender?: string; 
      budget?: number 
    }) => {
      const response = await apiClient.post('/ai/gift-suggest', data);
      return response.data.data;
    },
  });
}

// ==================== WARDROBE ====================

export interface WardrobeItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  category: string;
  color: string;
  size: string;
  purchaseDate: string;
  wornCount: number;
  lastWorn?: string;
  favorite: boolean;
}

export function useWardrobe() {
  return useQuery({
    queryKey: ['wardrobe'],
    queryFn: async () => {
      const response = await apiClient.get<{ 
        success: boolean; 
        data: { items: WardrobeItem[]; stats: { total: number; categories: Record<string, number> } } 
      }>('/user/wardrobe');
      return response.data.data;
    },
  });
}

export function useUpdateWardrobeItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, wornCount, favorite }: { id: string; wornCount?: number; favorite?: boolean }) => {
      const response = await apiClient.patch(`/user/wardrobe/${id}`, { wornCount, favorite });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wardrobe'] });
    },
  });
}

export function useRemoveFromWardrobe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/user/wardrobe/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wardrobe'] });
    },
  });
}

// ==================== AI STYLIST PREFERENCES ====================

export interface StylistPreferences {
  styles: string[];
  colorPalette: string;
  occasions: string[];
  budget: string;
  stylistName: string;
}

export function useStylistPreferences() {
  return useQuery({
    queryKey: ['stylist-preferences'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: StylistPreferences }>('/user/stylist-preferences');
      return response.data.data;
    },
  });
}

export function useSaveStylistPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: StylistPreferences) => {
      const response = await apiClient.put('/user/stylist-preferences', preferences);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stylist-preferences'] });
    },
  });
}

// ==================== OUTFIT BUILDER ====================

export interface Outfit {
  id: string;
  name: string;
  occasion: string;
  items: WardrobeItem[];
  createdAt: string;
  favorite: boolean;
}

export function useOutfits() {
  return useQuery({
    queryKey: ['outfits'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Outfit[] }>('/user/outfits');
      return response.data.data;
    },
  });
}

export function useCreateOutfit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; occasion: string; itemIds: string[] }) => {
      const response = await apiClient.post('/user/outfits', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outfits'] });
    },
  });
}

export function useAIOutfitSuggest() {
  return useMutation({
    mutationFn: async (data: { occasion?: string; weather?: string; mood?: string }) => {
      const response = await apiClient.post<{ success: boolean; data: { outfits: Outfit[]; reason: string }[] }>('/ai/outfit-suggest', data);
      return response.data.data;
    },
  });
}

// ==================== MEASUREMENTS ====================

export interface Measurements {
  height?: number;
  weight?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  inseam?: number;
  shoulderWidth?: number;
  armLength?: number;
  updatedAt?: string;
  confidence?: number;
}

export function useMeasurements() {
  return useQuery({
    queryKey: ['measurements'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Measurements }>('/user/measurements');
      return response.data.data;
    },
  });
}

export function useSaveMeasurements() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (measurements: Measurements) => {
      const response = await apiClient.put('/user/measurements', measurements);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['measurements'] });
    },
  });
}


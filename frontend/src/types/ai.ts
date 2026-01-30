/**
 * AI Types - Fashion AI
 */

export type AIJobType = 'VIRTUAL_TRYON' | 'SIZE_RECOMMEND' | 'CHAT_SUPPORT';
export type AIJobStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface AIJob {
  id: string;
  userId: string;
  type: AIJobType;
  status: AIJobStatus;
  inputData?: Record<string, unknown>;
  resultData?: Record<string, unknown>;
  resultUrl?: string;
  errorMessage?: string;
  productId?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

// Virtual Try-On
export interface TryOnRequest {
  productId: string;
  options?: {
    pose?: 'front' | 'side';
    quality?: 'standard' | 'high';
  };
}

export interface TryOnResponse {
  success: boolean;
  data: {
    jobId: string;
    status: AIJobStatus;
    estimatedTime: number;
  };
}

export interface TryOnResult {
  jobId: string;
  status: AIJobStatus;
  resultUrl?: string;
  result?: {
    outputImage: string;
    confidence?: number;
  };
  processingTime?: number;
  metadata?: {
    confidence: number;
    modelVersion: string;
  };
}

// Size Recommendation
export interface SizeRecommendRequest {
  productId: string;
  measurements?: {
    height?: number;
    weight?: number;
    chest?: number;
    waist?: number;
    hips?: number;
  };
}

export interface SizeRecommendResponse {
  success: boolean;
  data: {
    recommendedSize: string;
    confidence: number;
    alternatives: {
      size: string;
      confidence: number;
      note?: string;
    }[];
    tips: string[];
    fitAnalysis?: Record<string, {
      fit: 'tight' | 'good' | 'perfect' | 'loose';
      note: string;
    }>;
  };
}

// AI Chat
export type ChatMessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM';

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: ChatMessageRole;
  content: string;
  metadata?: {
    suggestedProducts?: string[];
    intent?: string;
    confidence?: number;
  };
  createdAt: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  title?: string;
  isActive: boolean;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatRequest {
  sessionId?: string;
  message: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    sessionId: string;
    message: ChatMessage;
  };
}

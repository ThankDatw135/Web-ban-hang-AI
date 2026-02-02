/**
 * Fashion AI - Payment API
 */

import apiClient from '../api-client';
import { ApiResponse, PaymentMethod } from '@/types/api';

export interface InitiatePaymentResponse {
  paymentUrl?: string; // For banking/momo redirect
  qrCode?: string;     // For QR display
  message: string;
}

export async function initiatePayment(orderId: string, method: PaymentMethod): Promise<InitiatePaymentResponse> {
  const response = await apiClient.post<ApiResponse<InitiatePaymentResponse>>('/payments/initiate', { orderId, method });
  return response.data.data;
}

/**
 * Fashion AI - Payments API
 * 
 * API functions cho thanh toán
 */

import apiClient from '../api-client';
import { ApiResponse } from '@/types/api';

// Types
export type PaymentMethod = 'COD' | 'MOMO' | 'ZALOPAY' | 'BANK';

export interface PaymentInitiateInput {
  orderId: string;
  method: PaymentMethod;
  returnUrl?: string;
}

export interface OnlinePaymentResponse {
  paymentUrl: string;
  orderId: string;
  transactionId: string;
}

export interface BankTransferResponse {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  transferContent: string;
  qrCodeUrl?: string;
}

export type PaymentResponse = OnlinePaymentResponse | BankTransferResponse;

export interface PaymentStatus {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  amount: number;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Initiate payment for an order
 */
export async function initiatePayment(input: PaymentInitiateInput): Promise<PaymentResponse> {
  const response = await apiClient.post<ApiResponse<PaymentResponse>>(
    '/payments/initiate',
    input
  );
  return response.data.data;
}

/**
 * Get payment status
 */
export async function getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
  const response = await apiClient.get<ApiResponse<PaymentStatus>>(
    `/payments/${paymentId}/status`
  );
  return response.data.data;
}

/**
 * Admin: Verify bank transfer manually
 */
export async function verifyBankTransfer(paymentId: string): Promise<PaymentStatus> {
  const response = await apiClient.post<ApiResponse<PaymentStatus>>(
    `/admin/payments/${paymentId}/verify-bank`
  );
  return response.data.data;
}

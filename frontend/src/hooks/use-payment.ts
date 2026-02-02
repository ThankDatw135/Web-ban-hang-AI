/**
 * Fashion AI - Payment Hooks
 */

'use client';

import { useMutation } from '@tanstack/react-query';
import * as paymentApi from '@/lib/api/payment';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useInitiatePayment() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ orderId, method }: { orderId: string; method: string }) => 
      paymentApi.initiatePayment(orderId, method as any),
    onSuccess: (data) => {
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl; // Redirect to payment gateway
      } else {
        toast.success(data.message || 'Vui lòng thực hiện thanh toán');
        // If no URL, maybe show QR code or instructions on Order Detail page
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi khởi tạo thanh toán');
    },
  });
}

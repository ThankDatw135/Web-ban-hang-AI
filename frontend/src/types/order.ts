/**
 * Order Types - Fashion AI
 */

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  province: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface AddressInput {
  fullName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  province: string;
  postalCode?: string;
  isDefault?: boolean;
}

export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'REFUNDED';

export type PaymentMethod = 'COD' | 'BANK' | 'MOMO' | 'ZALOPAY';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  addressId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  note?: string;
  shippingAddress: Address;
  items: OrderItem[];
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  total: number;
  itemCount: number;
  createdAt: string;
}

export interface CreateOrderRequest {
  addressId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  note?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  transactionId?: string;
  referenceCode: string;
  completedAt?: string;
}

export interface PaymentInitiateRequest {
  orderId: string;
  method: PaymentMethod;
  returnUrl?: string;
}

export interface PaymentInitiateResponse {
  success: boolean;
  data: {
    paymentId: string;
    payUrl?: string;
    qrCode?: string;
    bankInfo?: {
      bankName: string;
      accountNumber: string;
      accountName: string;
      amount: number;
      referenceCode: string;
    };
  };
}

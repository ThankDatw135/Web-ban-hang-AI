/**
 * Cart Types - Fashion AI
 */

import { ProductVariant } from './product';

export interface CartItemProduct {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
}

export interface CartItem {
  id: string;
  product: CartItemProduct;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  summary: CartSummary;
  coupon?: {
    code: string;
    discount: number;
    type: 'PERCENT' | 'FIXED';
  };
}

export interface AddToCartRequest {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface ApplyCouponRequest {
  code: string;
}

export interface CartResponse {
  success: boolean;
  data: Cart;
}

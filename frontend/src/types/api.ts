/**
 * Fashion AI - API TypeScript Types
 * 
 * Định nghĩa types cho API responses
 */

// =====================================================
// AUTH
// =====================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// =====================================================
// USER
// =====================================================

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  height?: number;
  weight?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  ward?: string;
  district: string;
  city: string;
  province: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface CreateAddressRequest {
  fullName: string;
  phone: string;
  street: string;
  ward?: string;
  district: string;
  city: string;
  province: string;
  postalCode?: string;
  isDefault?: boolean;
}

// =====================================================
// CATEGORY
// =====================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  children?: Category[];
}

// =====================================================
// PRODUCT
// =====================================================

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'FREE';

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
  isMain: boolean;
}

export interface ProductVariant {
  id: string;
  size: Size;
  color: string;
  colorCode?: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  salePrice?: number;
  sku: string;
  brand?: string;
  material?: string;
  categoryId: string;
  category?: Category;
  isActive: boolean;
  isFeatured: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  sizeGuide?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// =====================================================
// CART
// =====================================================

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: string;
  variantId: string;
  quantity: number;
}

// =====================================================
// ORDER
// =====================================================

export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'REFUNDED';

export type PaymentMethod = 'COD' | 'BANK' | 'MOMO' | 'ZALOPAY';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  productImage?: string;
  size: Size;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  note?: string;
  shippingAddress: Address;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

export interface CreateOrderRequest {
  addressId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  note?: string;
}

export interface OrderFilter {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

// =====================================================
// AI
// =====================================================

export type AIJobType = 'VIRTUAL_TRYON' | 'SIZE_RECOMMEND' | 'CHAT_SUPPORT';
export type AIJobStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface AIJob {
  id: string;
  userId: string;
  type: AIJobType;
  status: AIJobStatus;
  inputData: Record<string, unknown>;
  resultData?: Record<string, unknown>;
  resultUrl?: string;
  errorMessage?: string;
  productId?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface VirtualTryOnRequest {
  productId: string;
  userImageUrl: string;
}

export interface AIChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title?: string;
  isActive: boolean;
  messages: ChatMessage[];
  createdAt: string;
}

// =====================================================
// COUPONS
// =====================================================

export type CouponType = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
export type CouponStatus = 'available' | 'used' | 'expired';

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description?: string;
  type: CouponType;
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usagePerUser: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserCoupon extends Coupon {
  status: CouponStatus;
  usedAt?: string;
  orderId?: string;
}

export interface ValidateCouponRequest {
  code: string;
  orderTotal: number;
}

export interface ValidateCouponResponse {
  valid: boolean;
  coupon?: {
    code: string;
    name: string;
    type: CouponType;
    value: number;
    discountAmount: number;
    finalTotal: number;
  };
  error?: string;
  errorCode?: string;
}

// =====================================================
// API RESPONSE WRAPPER
// =====================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
}

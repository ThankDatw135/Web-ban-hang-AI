/**
 * Fashion AI - Utility Functions
 * 
 * Các hàm tiện ích dùng chung trong ứng dụng
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Gộp các Tailwind classes một cách thông minh
 * Xử lý conflicts và conditionals
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format số tiền theo định dạng Việt Nam
 * @param amount - Số tiền cần format
 * @param currency - Đơn vị tiền (mặc định: VND)
 * 
 * @example
 * formatCurrency(2500000) // "2.500.000đ"
 * formatCurrency(450, 'USD') // "$450"
 */
export function formatCurrency(amount: number, currency: 'VND' | 'USD' = 'VND'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  }
  
  // Format VND với dấu chấm ngăn cách hàng nghìn
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

/**
 * Format ngày tháng theo định dạng Việt Nam
 * @param date - Date object hoặc string
 * @param options - Tùy chọn format
 * 
 * @example
 * formatDate(new Date()) // "01/02/2026"
 * formatDate(new Date(), { includeTime: true }) // "01/02/2026 14:30"
 */
export function formatDate(
  date: Date | string,
  options?: { includeTime?: boolean }
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const dateStr = d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  
  if (options?.includeTime) {
    const timeStr = d.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${dateStr} ${timeStr}`;
  }
  
  return dateStr;
}

/**
 * Tạo slug từ string tiếng Việt
 * @param text - Text cần chuyển thành slug
 * 
 * @example
 * slugify('Áo Khoác Mùa Đông') // "ao-khoac-mua-dong"
 */
export function slugify(text: string): string {
  // Bảng chuyển đổi ký tự có dấu
  const vietnameseMap: Record<string, string> = {
    'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
    'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
    'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
    'đ': 'd',
    'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
    'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
    'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
    'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
    'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
    'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
    'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
    'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
  };
  
  return text
    .toLowerCase()
    .split('')
    .map(char => vietnameseMap[char] || char)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Truncate text với ellipsis
 * @param text - Text cần cắt
 * @param maxLength - Độ dài tối đa
 * 
 * @example
 * truncate('Đây là một đoạn văn rất dài', 20) // "Đây là một đoạn..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Delay execution (dùng cho testing, debounce)
 * @param ms - Số milliseconds cần đợi
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check xem có phải client-side không
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Generate random ID
 * @param prefix - Prefix cho ID
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 11)}`;
}

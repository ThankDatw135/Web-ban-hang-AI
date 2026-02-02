/**
 * Fashion AI - Formatting Utilities
 */

/**
 * Format số thành tiền tệ Việt Nam (VND)
 * @param value Giá trị số
 * @returns Chuỗi định dạng tiền tệ (VD: 100.000 ₫)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
}

/**
 * Format ngày tháng
 * @param date Chuỗi ngày hoặc Date object
 * @returns Chuỗi ngày định dạng vi-VN
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

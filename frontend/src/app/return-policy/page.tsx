/**
 * Fashion AI - Chính Sách Đổi Trả
 * 
 * Thông tin về chính sách đổi/trả hàng
 */

import { Package, RefreshCw, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách đổi trả',
  description: 'Chính sách đổi trả hàng tại Fashion AI. Đổi trả miễn phí trong 30 ngày.',
};

// Điều kiện đổi trả
const returnConditions = [
  {
    icon: CheckCircle,
    title: 'Được chấp nhận',
    color: 'text-success',
    bgColor: 'bg-success/10',
    items: [
      'Sản phẩm chưa qua sử dụng, còn nguyên tag',
      'Còn trong thời hạn 30 ngày kể từ ngày nhận',
      'Có hóa đơn mua hàng hoặc mã đơn hàng',
      'Sản phẩm bị lỗi từ nhà sản xuất',
      'Giao sai mẫu/size/màu so với đơn đặt',
    ],
  },
  {
    icon: XCircle,
    title: 'Không được chấp nhận',
    color: 'text-error',
    bgColor: 'bg-error/10',
    items: [
      'Sản phẩm đã qua sử dụng, giặt, là',
      'Sản phẩm đã cắt tag, mất tag',
      'Quá 30 ngày kể từ ngày nhận hàng',
      'Sản phẩm trong chương trình sale/khuyến mãi (trừ lỗi sản xuất)',
      'Sản phẩm bị hư hỏng do người dùng',
    ],
  },
];

// Các bước đổi trả
const returnSteps = [
  {
    step: 1,
    title: 'Liên hệ',
    description: 'Gọi hotline 1900 1234 hoặc chat với chúng tôi để tạo yêu cầu đổi/trả',
  },
  {
    step: 2,
    title: 'Đóng gói',
    description: 'Đóng gói sản phẩm cẩn thận, kèm hóa đơn và phiếu đổi trả',
  },
  {
    step: 3,
    title: 'Gửi hàng',
    description: 'Shipper sẽ đến lấy hàng hoặc bạn gửi về địa chỉ của chúng tôi',
  },
  {
    step: 4,
    title: 'Hoàn tiền',
    description: 'Nhận hàng mới trong 3-5 ngày hoặc hoàn tiền trong 7-14 ngày',
  },
];

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chính sách đổi trả</h1>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Fashion AI cam kết mang đến trải nghiệm mua sắm an tâm với chính sách đổi trả linh hoạt.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="card p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">30 ngày đổi trả</h3>
            <p className="text-secondary text-sm">Đổi trả miễn phí trong vòng 30 ngày</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Package className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Miễn phí vận chuyển</h3>
            <p className="text-secondary text-sm">Không tốn phí gửi hàng đổi trả</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Hoàn tiền nhanh</h3>
            <p className="text-secondary text-sm">Hoàn tiền trong 7-14 ngày làm việc</p>
          </div>
        </div>

        {/* Return Process */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Quy trình đổi trả</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {returnSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-secondary text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {returnConditions.map((condition) => (
            <div key={condition.title} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${condition.bgColor} flex items-center justify-center`}>
                  <condition.icon className={`w-5 h-5 ${condition.color}`} />
                </div>
                <h3 className="font-bold text-lg">{condition.title}</h3>
              </div>
              <ul className="space-y-3">
                {condition.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <condition.icon className={`w-4 h-4 ${condition.color} mt-0.5 flex-shrink-0`} />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="card p-6 bg-warning/5 border border-warning/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Lưu ý quan trọng</h3>
              <p className="text-secondary text-sm">
                Đối với sản phẩm đặt may riêng hoặc sản phẩm giảm giá trên 50%, 
                chính sách đổi trả có thể khác. Vui lòng liên hệ hotline <strong>1900 1234</strong> 
                để được tư vấn chi tiết trước khi mua hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

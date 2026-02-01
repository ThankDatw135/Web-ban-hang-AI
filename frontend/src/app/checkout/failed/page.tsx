/**
 * Fashion AI - Payment Failed Page
 * 
 * Trang thanh toán thất bại
 */

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error') || 'PAYMENT_DECLINED';
  
  const errorMessages: Record<string, { title: string; description: string }> = {
    PAYMENT_DECLINED: {
      title: 'Thanh toán bị từ chối',
      description: 'Thẻ của bạn đã bị từ chối. Vui lòng kiểm tra lại thông tin thẻ hoặc thử phương thức thanh toán khác.'
    },
    INSUFFICIENT_FUNDS: {
      title: 'Số dư không đủ',
      description: 'Tài khoản của bạn không đủ số dư để thực hiện giao dịch này.'
    },
    EXPIRED_CARD: {
      title: 'Thẻ hết hạn',
      description: 'Thẻ của bạn đã hết hạn. Vui lòng sử dụng thẻ khác.'
    },
    NETWORK_ERROR: {
      title: 'Lỗi kết nối',
      description: 'Không thể kết nối với cổng thanh toán. Vui lòng thử lại sau.'
    },
    TIMEOUT: {
      title: 'Hết thời gian chờ',
      description: 'Phiên giao dịch đã hết hạn. Vui lòng thực hiện lại thanh toán.'
    }
  };

  const error = errorMessages[errorCode] || errorMessages.PAYMENT_DECLINED;

  return (
    <>
      <Header cartItemsCount={0} />
      
      <main className="flex-1 bg-cream">
        <div className="container-app py-16">
          <div className="max-w-lg mx-auto text-center">
            {/* Error icon */}
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl text-red-600">error</span>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-red-600">{error.title}</h1>
            <p className="text-gray-600 mb-8">
              {error.description}
            </p>

            {/* Error details card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-left mb-8">
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl mb-4">
                <span className="material-symbols-outlined text-red-500">warning</span>
                <div className="text-sm">
                  <p className="font-semibold text-red-700">Mã lỗi: {errorCode}</p>
                  <p className="text-red-600">Giao dịch không thành công</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  <strong>Giỏ hàng của bạn vẫn được giữ nguyên.</strong> Bạn có thể thử thanh toán lại hoặc chọn phương thức thanh toán khác.
                </p>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">help</span>
                  <div>
                    <p className="font-semibold mb-1">Cần hỗ trợ?</p>
                    <p className="text-sm text-gray-600">
                      Liên hệ hotline: <strong>1900-6789</strong><br />
                      Email: support@fashion-ai.vn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/checkout">
                <button className="w-full sm:w-auto px-8 h-12 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">refresh</span>
                  Thử thanh toán lại
                </button>
              </Link>
              <Link href="/cart">
                <button className="w-full sm:w-auto px-8 h-12 rounded-full border border-gray-300 font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                  Quay lại giỏ hàng
                </button>
              </Link>
            </div>

            {/* Alternative payment methods */}
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm">
              <p className="text-sm font-semibold mb-4">Hoặc chọn phương thức thanh toán khác:</p>
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                  Thanh toán khi nhận hàng
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm">
                  <span className="material-symbols-outlined text-[20px]">account_balance</span>
                  Chuyển khoản ngân hàng
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

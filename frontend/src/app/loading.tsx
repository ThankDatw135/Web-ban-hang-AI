/**
 * Fashion AI - Loading State
 * 
 * Loading skeleton cho các trang
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        {/* Loading spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto mb-6" />
        
        {/* Text */}
        <p className="text-gray-600 font-medium">Đang tải...</p>
      </div>
    </div>
  );
}

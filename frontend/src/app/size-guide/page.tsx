/**
 * Fashion AI - Size Guide Page
 */

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Ruler, Info, Calculator, CheckCircle } from 'lucide-react';

const SizeRecommender = dynamic(() => import('@/components/ai/SizeRecommender'), { ssr: false });

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');
  const [showAIModal, setShowAIModal] = useState(false);

  return (
    <div className="min-h-screen py-12">
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hướng dẫn chọn size</h1>
          <p className="text-secondary text-lg max-w-xl mx-auto">
             Tìm kích cỡ hoàn hảo cho bạn với bảng size chuẩn và công nghệ AI gợi ý thông minh.
          </p>
        </div>

        {/* AI Banner */}
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-8 mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <Calculator className="w-6 h-6 text-primary" />
                    Không chắc chắn về size?
                </h2>
                <p className="text-secondary">
                    Sử dụng công nghệ AI của chúng tôi để nhận gợi ý size chính xác dựa trên chiều cao và cân nặng của bạn.
                </p>
            </div>
            <button 
                onClick={() => setShowAIModal(true)}
                className="btn-primary whitespace-nowrap px-8 py-3 text-lg shadow-lg shadow-primary/20"
            >
                AI Tư vấn size ngay
            </button>
        </div>

        {/* Size Charts */}
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 dark:bg-[#2c2822] p-1 rounded-full flex gap-1">
                    <button 
                       onClick={() => setActiveTab('men')}
                       className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'men' ? 'bg-white dark:bg-[#1e1a14] shadow-sm text-primary' : 'text-secondary hover:text-primary'}`}
                    >
                        Nam giới
                    </button>
                    <button 
                       onClick={() => setActiveTab('women')}
                       className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'women' ? 'bg-white dark:bg-[#1e1a14] shadow-sm text-primary' : 'text-secondary hover:text-primary'}`}
                    >
                        Nữ giới
                    </button>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-secondary" />
                    <h3 className="font-bold">Bảng size áo (T-Shirt, Shirt, Polo)</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                             <tr className="bg-gray-50/50 dark:bg-gray-900/20">
                                 <th className="p-4 font-bold text-sm">Size</th>
                                 <th className="p-4 font-medium text-sm text-secondary">Chiều cao (cm)</th>
                                 <th className="p-4 font-medium text-sm text-secondary">Cân nặng (kg)</th>
                                 <th className="p-4 font-medium text-sm text-secondary">Vòng ngực (cm)</th>
                             </tr>
                        </thead>
                        <tbody>
                            {activeTab === 'men' ? (
                                <>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <td className="p-4 font-bold">S</td>
                                        <td className="p-4">160 - 165</td>
                                        <td className="p-4">50 - 57</td>
                                        <td className="p-4">86 - 90</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20">
                                        <td className="p-4 font-bold">M</td>
                                        <td className="p-4">166 - 170</td>
                                        <td className="p-4">58 - 65</td>
                                        <td className="p-4">90 - 94</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <td className="p-4 font-bold">L</td>
                                        <td className="p-4">171 - 175</td>
                                        <td className="p-4">66 - 72</td>
                                        <td className="p-4">94 - 98</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20">
                                        <td className="p-4 font-bold">XL</td>
                                        <td className="p-4">176 - 180</td>
                                        <td className="p-4">73 - 80</td>
                                        <td className="p-4">98 - 102</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-bold">XXL</td>
                                        <td className="p-4">181 - 185</td>
                                        <td className="p-4">81 - 90</td>
                                        <td className="p-4">102 - 106</td>
                                    </tr>
                                </>
                            ) : (
                                <>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <td className="p-4 font-bold">S</td>
                                        <td className="p-4">150 - 155</td>
                                        <td className="p-4">40 - 45</td>
                                        <td className="p-4">80 - 84</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20">
                                        <td className="p-4 font-bold">M</td>
                                        <td className="p-4">156 - 160</td>
                                        <td className="p-4">46 - 52</td>
                                        <td className="p-4">84 - 88</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <td className="p-4 font-bold">L</td>
                                        <td className="p-4">161 - 165</td>
                                        <td className="p-4">53 - 58</td>
                                        <td className="p-4">88 - 92</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-bold">XL</td>
                                        <td className="p-4">166 - 170</td>
                                        <td className="p-4">59 - 65</td>
                                        <td className="p-4">92 - 96</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Measuring Guide */}
            <div className="mt-12">
                <h3 className="text-xl font-bold mb-6 text-center">Cách đo kích thước cơ thể</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="card p-6 text-center">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                        <h4 className="font-bold mb-2">Vòng ngực</h4>
                        <p className="text-sm text-secondary">
                            Đo quanh phần rộng nhất của ngực, giữ thước đo song song với mặt đất.
                        </p>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                        <h4 className="font-bold mb-2">Vòng eo</h4>
                        <p className="text-sm text-secondary">
                            Đo quanh phần nhỏ nhất của eo, thường nằm trên rốn khoảng 2-3cm.
                        </p>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                        <h4 className="font-bold mb-2">Vòng hông</h4>
                        <p className="text-sm text-secondary">
                            Đo quanh phần rộng nhất của hông, khép hai chân lại.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <SizeRecommender
           productId="generic" // Dummy ID for generic recommendation
           isOpen={showAIModal}
           onClose={() => setShowAIModal(false)}
           onSelectSize={(size) => {
             // Handle size selection (optional here)
             console.log('Selected size:', size);
             setShowAIModal(false);
           }}
        />
      )}
    </div>
  );
}

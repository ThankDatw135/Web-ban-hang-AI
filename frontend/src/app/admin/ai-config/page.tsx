/**
 * Admin AI Configuration - Fashion AI
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Save, RefreshCw, Sliders, Bot, Camera, Palette, MessageSquare } from 'lucide-react';

const aiModules = [
  { id: 'stylist', name: 'AI Stylist', description: 'Tư vấn phong cách và outfit', icon: Palette, enabled: true },
  { id: 'tryon', name: 'AI Try-On', description: 'Thử đồ ảo với camera', icon: Camera, enabled: true },
  { id: 'bodyscan', name: 'AI Body Scan', description: 'Đo số đo tự động', icon: Bot, enabled: true },
  { id: 'chat', name: 'AI Concierge', description: 'Chatbot hỗ trợ 24/7', icon: MessageSquare, enabled: true },
];

export default function AdminAIConfig() {
  const [modules, setModules] = useState(aiModules);
  const [settings, setSettings] = useState({
    recommendationCount: 10,
    confidenceThreshold: 0.75,
    maxChatHistory: 50,
    responseTimeout: 30,
  });

  const toggleModule = (id: string) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="size-10 flex items-center justify-center rounded-lg hover:bg-secondary-50">
              <ArrowLeft className="size-5 text-text-muted" />
            </Link>
            <h1 className="text-xl font-bold text-text-main">Cấu Hình AI</h1>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90">
            <Save className="size-5" />
            Lưu cấu hình
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* AI Modules */}
        <section className="bg-white rounded-2xl border border-border p-6 mb-6">
          <h2 className="font-bold text-text-main mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-accent" />
            Modules AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center ${module.enabled ? 'bg-accent/10' : 'bg-gray-100'}`}>
                      <Icon className={`size-5 ${module.enabled ? 'text-accent' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-text-main">{module.name}</p>
                      <p className="text-sm text-text-muted">{module.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${module.enabled ? 'bg-accent' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${module.enabled ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Settings */}
        <section className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-bold text-text-main mb-4 flex items-center gap-2">
            <Sliders className="size-5 text-primary" />
            Thông Số AI
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">
                Số gợi ý sản phẩm ({settings.recommendationCount})
              </label>
              <input
                type="range"
                min="5"
                max="20"
                value={settings.recommendationCount}
                onChange={(e) => setSettings(s => ({ ...s, recommendationCount: Number(e.target.value) }))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">
                Ngưỡng độ tin cậy ({Math.round(settings.confidenceThreshold * 100)}%)
              </label>
              <input
                type="range"
                min="50"
                max="95"
                value={settings.confidenceThreshold * 100}
                onChange={(e) => setSettings(s => ({ ...s, confidenceThreshold: Number(e.target.value) / 100 }))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">
                Lịch sử chat tối đa ({settings.maxChatHistory} tin nhắn)
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={settings.maxChatHistory}
                onChange={(e) => setSettings(s => ({ ...s, maxChatHistory: Number(e.target.value) }))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">
                Timeout phản hồi ({settings.responseTimeout}s)
              </label>
              <input
                type="range"
                min="10"
                max="60"
                value={settings.responseTimeout}
                onChange={(e) => setSettings(s => ({ ...s, responseTimeout: Number(e.target.value) }))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

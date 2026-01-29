import { PrismaClient } from '@prisma/client';

export async function seedSettings(prisma: PrismaClient) {
  const settings = [
    // General
    {
      key: 'site_name',
      value: 'Fashion AI',
      group: 'general',
    },
    {
      key: 'site_description',
      value: 'Thời trang thông minh với công nghệ AI',
      group: 'general',
    },
    {
      key: 'site_logo',
      value: '/images/logo.png',
      group: 'general',
    },
    {
      key: 'contact_email',
      value: 'support@fashionai.vn',
      group: 'general',
    },
    {
      key: 'contact_phone',
      value: '1900 1234',
      group: 'general',
    },
    {
      key: 'contact_address',
      value: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      group: 'general',
    },

    // Shipping
    {
      key: 'shipping_fee_inner_city',
      value: { amount: 20000, currency: 'VND', description: 'Nội thành TP.HCM' },
      group: 'shipping',
    },
    {
      key: 'shipping_fee_suburban',
      value: { amount: 30000, currency: 'VND', description: 'Ngoại thành TP.HCM' },
      group: 'shipping',
    },
    {
      key: 'shipping_fee_other',
      value: { amount: 35000, currency: 'VND', description: 'Các tỉnh khác' },
      group: 'shipping',
    },
    {
      key: 'free_shipping_threshold',
      value: { amount: 500000, currency: 'VND' },
      group: 'shipping',
    },

    // Payment
    {
      key: 'payment_cod_enabled',
      value: true,
      group: 'payment',
    },
    {
      key: 'payment_bank_enabled',
      value: true,
      group: 'payment',
    },
    {
      key: 'payment_bank_info',
      value: {
        bank_name: 'Vietcombank',
        account_number: '1234567890',
        account_holder: 'CONG TY FASHION AI',
        branch: 'Chi nhánh TP.HCM',
      },
      group: 'payment',
    },
    {
      key: 'payment_momo_enabled',
      value: true,
      group: 'payment',
    },
    {
      key: 'payment_zalopay_enabled',
      value: true,
      group: 'payment',
    },

    // AI Features
    {
      key: 'ai_virtual_tryon_enabled',
      value: true,
      group: 'ai',
    },
    {
      key: 'ai_virtual_tryon_rate_limit',
      value: { requests: 5, per_minutes: 1 },
      group: 'ai',
    },
    {
      key: 'ai_size_recommendation_enabled',
      value: true,
      group: 'ai',
    },
    {
      key: 'ai_size_recommendation_rate_limit',
      value: { requests: 20, per_minutes: 1 },
      group: 'ai',
    },
    {
      key: 'ai_chat_enabled',
      value: true,
      group: 'ai',
    },
    {
      key: 'ai_chat_rate_limit',
      value: { requests: 30, per_minutes: 1 },
      group: 'ai',
    },

    // Social Links
    {
      key: 'social_facebook',
      value: 'https://facebook.com/fashionai.vn',
      group: 'social',
    },
    {
      key: 'social_instagram',
      value: 'https://instagram.com/fashionai.vn',
      group: 'social',
    },
    {
      key: 'social_tiktok',
      value: 'https://tiktok.com/@fashionai.vn',
      group: 'social',
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: {
        key: setting.key,
        value: setting.value,
        group: setting.group,
      },
    });
  }

  console.log(`  ✓ Created ${settings.length} settings`);
}

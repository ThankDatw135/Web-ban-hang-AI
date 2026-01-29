import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
  // Admin account
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fashionai.vn' },
    update: {},
    create: {
      email: 'admin@fashionai.vn',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'Fashion AI',
      phone: '0901234567',
      role: 'ADMIN',
      isActive: true,
      emailVerified: true,
    },
  });
  console.log(`  ✓ Created admin: ${admin.email}`);

  // Test users with body measurements
  const testUsers = [
    {
      email: 'user1@example.com',
      firstName: 'Nguyễn',
      lastName: 'Văn A',
      phone: '0912345678',
      height: 170,
      weight: 65,
      chest: 95,
      waist: 80,
      hips: 95,
    },
    {
      email: 'user2@example.com',
      firstName: 'Trần',
      lastName: 'Thị B',
      phone: '0923456789',
      height: 160,
      weight: 52,
      chest: 85,
      waist: 65,
      hips: 90,
    },
    {
      email: 'user3@example.com',
      firstName: 'Lê',
      lastName: 'Văn C',
      phone: '0934567890',
      height: 175,
      weight: 72,
      chest: 100,
      waist: 85,
      hips: 98,
    },
  ];

  const userPassword = await bcrypt.hash('User@123', 12);

  for (const userData of testUsers) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: userPassword,
        role: 'USER',
        isActive: true,
        emailVerified: true,
        addresses: {
          create: {
            fullName: `${userData.firstName} ${userData.lastName}`,
            phone: userData.phone,
            street: '123 Nguyễn Huệ',
            ward: 'Phường Bến Nghé',
            district: 'Quận 1',
            city: 'TP. Hồ Chí Minh',
            province: 'Hồ Chí Minh',
            isDefault: true,
          },
        },
        cart: {
          create: {},
        },
      },
    });
    console.log(`  ✓ Created user: ${user.email}`);
  }
}

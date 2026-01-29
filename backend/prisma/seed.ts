import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/users';
import { seedCategories } from './seeds/categories';
import { seedProducts } from './seeds/products';
import { seedSettings } from './seeds/settings';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...\n');

  // Seed in order of dependencies
  console.log('👤 Seeding users...');
  await seedUsers(prisma);

  console.log('📁 Seeding categories...');
  await seedCategories(prisma);

  console.log('👕 Seeding products...');
  await seedProducts(prisma);

  console.log('⚙️ Seeding settings...');
  await seedSettings(prisma);

  console.log('\n✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

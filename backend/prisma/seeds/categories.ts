import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient) {
  const categories = [
    // Main categories
    {
      name: 'Áo',
      slug: 'ao',
      description: 'Các loại áo thời trang',
      sortOrder: 1,
      children: [
        { name: 'Áo Thun', slug: 'ao-thun', description: 'Áo thun nam nữ', sortOrder: 1 },
        { name: 'Áo Sơ Mi', slug: 'ao-so-mi', description: 'Áo sơ mi công sở', sortOrder: 2 },
        { name: 'Áo Polo', slug: 'ao-polo', description: 'Áo polo thể thao', sortOrder: 3 },
        { name: 'Áo Khoác', slug: 'ao-khoac', description: 'Áo khoác các loại', sortOrder: 4 },
        { name: 'Áo Hoodie', slug: 'ao-hoodie', description: 'Áo hoodie trẻ trung', sortOrder: 5 },
      ],
    },
    {
      name: 'Quần',
      slug: 'quan',
      description: 'Các loại quần thời trang',
      sortOrder: 2,
      children: [
        { name: 'Quần Jeans', slug: 'quan-jeans', description: 'Quần jeans bò', sortOrder: 1 },
        { name: 'Quần Kaki', slug: 'quan-kaki', description: 'Quần kaki công sở', sortOrder: 2 },
        { name: 'Quần Short', slug: 'quan-short', description: 'Quần short mùa hè', sortOrder: 3 },
        { name: 'Quần Jogger', slug: 'quan-jogger', description: 'Quần jogger thể thao', sortOrder: 4 },
      ],
    },
    {
      name: 'Đầm & Váy',
      slug: 'dam-vay',
      description: 'Đầm váy thời trang nữ',
      sortOrder: 3,
      children: [
        { name: 'Đầm Suông', slug: 'dam-suong', description: 'Đầm suông công sở', sortOrder: 1 },
        { name: 'Đầm Maxi', slug: 'dam-maxi', description: 'Đầm maxi dài', sortOrder: 2 },
        { name: 'Váy Mini', slug: 'vay-mini', description: 'Váy mini trẻ trung', sortOrder: 3 },
        { name: 'Chân Váy', slug: 'chan-vay', description: 'Chân váy các loại', sortOrder: 4 },
      ],
    },
    {
      name: 'Phụ Kiện',
      slug: 'phu-kien',
      description: 'Phụ kiện thời trang',
      sortOrder: 4,
      children: [
        { name: 'Thắt Lưng', slug: 'that-lung', description: 'Thắt lưng da', sortOrder: 1 },
        { name: 'Mũ & Nón', slug: 'mu-non', description: 'Mũ nón các loại', sortOrder: 2 },
        { name: 'Túi Xách', slug: 'tui-xach', description: 'Túi xách thời trang', sortOrder: 3 },
        { name: 'Kính Mát', slug: 'kinh-mat', description: 'Kính mát thời trang', sortOrder: 4 },
      ],
    },
  ];

  for (const category of categories) {
    const { children, ...parentData } = category;

    // Create parent category
    const parent = await prisma.category.upsert({
      where: { slug: parentData.slug },
      update: {},
      create: {
        name: parentData.name,
        slug: parentData.slug,
        description: parentData.description,
        sortOrder: parentData.sortOrder,
        isActive: true,
      },
    });
    console.log(`  ✓ Created category: ${parent.name}`);

    // Create child categories
    if (children) {
      for (const child of children) {
        await prisma.category.upsert({
          where: { slug: child.slug },
          update: {},
          create: {
            name: child.name,
            slug: child.slug,
            description: child.description,
            sortOrder: child.sortOrder,
            parentId: parent.id,
            isActive: true,
          },
        });
        console.log(`    ✓ Created subcategory: ${child.name}`);
      }
    }
  }
}

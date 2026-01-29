import { PrismaClient, Size } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient) {
  // Get categories
  const aoThun = await prisma.category.findUnique({ where: { slug: 'ao-thun' } });
  const aoSoMi = await prisma.category.findUnique({ where: { slug: 'ao-so-mi' } });
  const quanJeans = await prisma.category.findUnique({ where: { slug: 'quan-jeans' } });
  const damSuong = await prisma.category.findUnique({ where: { slug: 'dam-suong' } });

  if (!aoThun || !aoSoMi || !quanJeans || !damSuong) {
    console.log('  ⚠️ Categories not found, skipping products seed');
    return;
  }

  const products = [
    // Áo thun
    {
      name: 'Áo Thun Cotton Basic',
      slug: 'ao-thun-cotton-basic',
      description: 'Áo thun cotton 100% thoáng mát, form regular fit phù hợp mọi dáng người.',
      price: 199000,
      salePrice: 149000,
      sku: 'ATN-001',
      brand: 'Fashion AI',
      material: 'Cotton 100%',
      categoryId: aoThun.id,
      isFeatured: true,
      sizeGuide: {
        S: { chest: '88-92', length: 66, shoulder: 42 },
        M: { chest: '92-96', length: 68, shoulder: 44 },
        L: { chest: '96-100', length: 70, shoulder: 46 },
        XL: { chest: '100-104', length: 72, shoulder: 48 },
      },
      variants: [
        { size: 'S', color: 'Đen', colorCode: '#000000', stock: 50 },
        { size: 'M', color: 'Đen', colorCode: '#000000', stock: 100 },
        { size: 'L', color: 'Đen', colorCode: '#000000', stock: 80 },
        { size: 'XL', color: 'Đen', colorCode: '#000000', stock: 40 },
        { size: 'S', color: 'Trắng', colorCode: '#FFFFFF', stock: 50 },
        { size: 'M', color: 'Trắng', colorCode: '#FFFFFF', stock: 100 },
        { size: 'L', color: 'Trắng', colorCode: '#FFFFFF', stock: 80 },
        { size: 'XL', color: 'Trắng', colorCode: '#FFFFFF', stock: 40 },
        { size: 'M', color: 'Xám', colorCode: '#808080', stock: 60 },
        { size: 'L', color: 'Xám', colorCode: '#808080', stock: 60 },
      ],
      images: [
        { url: '/images/products/ao-thun-basic-1.jpg', isMain: true },
        { url: '/images/products/ao-thun-basic-2.jpg', isMain: false },
      ],
    },
    {
      name: 'Áo Thun Oversize',
      slug: 'ao-thun-oversize',
      description: 'Áo thun form oversize thời thượng, chất liệu cotton cao cấp.',
      price: 249000,
      sku: 'ATN-002',
      brand: 'Fashion AI',
      material: 'Cotton 95%, Spandex 5%',
      categoryId: aoThun.id,
      isFeatured: true,
      sizeGuide: {
        M: { chest: '102-106', length: 72, shoulder: 50 },
        L: { chest: '106-110', length: 74, shoulder: 52 },
        XL: { chest: '110-114', length: 76, shoulder: 54 },
      },
      variants: [
        { size: 'M', color: 'Đen', colorCode: '#000000', stock: 70 },
        { size: 'L', color: 'Đen', colorCode: '#000000', stock: 80 },
        { size: 'XL', color: 'Đen', colorCode: '#000000', stock: 50 },
        { size: 'M', color: 'Kem', colorCode: '#F5F5DC', stock: 60 },
        { size: 'L', color: 'Kem', colorCode: '#F5F5DC', stock: 70 },
      ],
      images: [
        { url: '/images/products/ao-thun-oversize-1.jpg', isMain: true },
      ],
    },
    // Áo sơ mi
    {
      name: 'Áo Sơ Mi Công Sở',
      slug: 'ao-so-mi-cong-so',
      description: 'Áo sơ mi công sở lịch lãm, chất liệu cotton pha không nhăn.',
      price: 399000,
      salePrice: 329000,
      sku: 'ASM-001',
      brand: 'Fashion AI',
      material: 'Cotton 70%, Polyester 30%',
      categoryId: aoSoMi.id,
      isFeatured: true,
      sizeGuide: {
        S: { chest: '90-94', length: 70, shoulder: 43 },
        M: { chest: '94-98', length: 72, shoulder: 45 },
        L: { chest: '98-102', length: 74, shoulder: 47 },
        XL: { chest: '102-106', length: 76, shoulder: 49 },
      },
      variants: [
        { size: 'S', color: 'Trắng', colorCode: '#FFFFFF', stock: 40 },
        { size: 'M', color: 'Trắng', colorCode: '#FFFFFF', stock: 80 },
        { size: 'L', color: 'Trắng', colorCode: '#FFFFFF', stock: 60 },
        { size: 'XL', color: 'Trắng', colorCode: '#FFFFFF', stock: 30 },
        { size: 'M', color: 'Xanh Nhạt', colorCode: '#ADD8E6', stock: 50 },
        { size: 'L', color: 'Xanh Nhạt', colorCode: '#ADD8E6', stock: 50 },
      ],
      images: [
        { url: '/images/products/ao-so-mi-1.jpg', isMain: true },
        { url: '/images/products/ao-so-mi-2.jpg', isMain: false },
      ],
    },
    // Quần jeans
    {
      name: 'Quần Jeans Slim Fit',
      slug: 'quan-jeans-slim-fit',
      description: 'Quần jeans slim fit co giãn, thoải mái vận động.',
      price: 499000,
      sku: 'QJN-001',
      brand: 'Fashion AI',
      material: 'Cotton 98%, Spandex 2%',
      categoryId: quanJeans.id,
      isFeatured: true,
      sizeGuide: {
        29: { waist: 74, hips: 94, length: 100 },
        30: { waist: 76, hips: 96, length: 102 },
        31: { waist: 78, hips: 98, length: 104 },
        32: { waist: 80, hips: 100, length: 106 },
        33: { waist: 82, hips: 102, length: 106 },
        34: { waist: 84, hips: 104, length: 108 },
      },
      variants: [
        { size: 'S', color: 'Xanh Đậm', colorCode: '#00008B', stock: 40 },
        { size: 'M', color: 'Xanh Đậm', colorCode: '#00008B', stock: 60 },
        { size: 'L', color: 'Xanh Đậm', colorCode: '#00008B', stock: 50 },
        { size: 'XL', color: 'Xanh Đậm', colorCode: '#00008B', stock: 30 },
        { size: 'M', color: 'Xanh Nhạt', colorCode: '#87CEEB', stock: 40 },
        { size: 'L', color: 'Xanh Nhạt', colorCode: '#87CEEB', stock: 40 },
      ],
      images: [
        { url: '/images/products/quan-jeans-1.jpg', isMain: true },
      ],
    },
    // Đầm
    {
      name: 'Đầm Suông Công Sở',
      slug: 'dam-suong-cong-so',
      description: 'Đầm suông thanh lịch, phù hợp công sở và dạo phố.',
      price: 599000,
      salePrice: 499000,
      sku: 'DAM-001',
      brand: 'Fashion AI',
      material: 'Polyester 100%',
      categoryId: damSuong.id,
      isFeatured: true,
      sizeGuide: {
        S: { bust: 84, waist: 66, hips: 90, length: 95 },
        M: { bust: 88, waist: 70, hips: 94, length: 97 },
        L: { bust: 92, waist: 74, hips: 98, length: 99 },
      },
      variants: [
        { size: 'S', color: 'Đen', colorCode: '#000000', stock: 30 },
        { size: 'M', color: 'Đen', colorCode: '#000000', stock: 50 },
        { size: 'L', color: 'Đen', colorCode: '#000000', stock: 40 },
        { size: 'S', color: 'Đỏ Đô', colorCode: '#800000', stock: 25 },
        { size: 'M', color: 'Đỏ Đô', colorCode: '#800000', stock: 35 },
        { size: 'L', color: 'Đỏ Đô', colorCode: '#800000', stock: 30 },
      ],
      images: [
        { url: '/images/products/dam-suong-1.jpg', isMain: true },
        { url: '/images/products/dam-suong-2.jpg', isMain: false },
      ],
    },
  ];

  for (const productData of products) {
    const { variants, images, ...product } = productData;

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (existing) {
      console.log(`  ⏭️ Product exists: ${product.name}`);
      continue;
    }

    // Create product with variants and images
    const created = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice,
        sku: product.sku,
        brand: product.brand,
        material: product.material,
        categoryId: product.categoryId,
        isFeatured: product.isFeatured || false,
        isActive: true,
        sizeGuide: product.sizeGuide,
        variants: {
          create: variants.map((v, index) => ({
            size: v.size as Size,
            color: v.color,
            colorCode: v.colorCode,
            stock: v.stock,
            sku: `${product.sku}-${v.size}-${index}`,
          })),
        },
        images: {
          create: images.map((img, index) => ({
            url: img.url,
            isMain: img.isMain,
            sortOrder: index,
          })),
        },
      },
    });

    console.log(`  ✓ Created product: ${created.name} (${variants.length} variants)`);
  }
}

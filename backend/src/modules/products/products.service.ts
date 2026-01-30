import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductFilterDto, ProductSortBy, CreateProductDto, UpdateProductDto } from './dto';
import { Prisma, Size } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: ProductFilterDto) {
    const where: Prisma.ProductWhereInput = {
      isActive: true,
    };

    // Search by name
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    // Filter by category
    if (filter.category) {
      where.category = {
        OR: [
          { slug: filter.category },
          { parent: { slug: filter.category } },
        ],
      };
    }

    // Filter by brand
    if (filter.brand) {
      where.brand = { equals: filter.brand, mode: 'insensitive' };
    }

    // Price range
    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      where.price = {};
      if (filter.minPrice !== undefined) {
        where.price.gte = filter.minPrice;
      }
      if (filter.maxPrice !== undefined) {
        where.price.lte = filter.maxPrice;
      }
    }

    // Filter by size/color through variants
    if (filter.size || filter.color) {
      where.variants = {
        some: {
          ...(filter.size && { size: filter.size as Size }),
          ...(filter.color && { color: { contains: filter.color, mode: 'insensitive' } }),
          stock: { gt: 0 },
        },
      };
    }

    // Featured products
    if (filter.featured) {
      where.isFeatured = true;
    }

    // On sale
    if (filter.onSale) {
      where.salePrice = { not: null };
    }

    // Sort order
    let orderBy: Prisma.ProductOrderByWithRelationInput;
    switch (filter.sortBy) {
      case ProductSortBy.PRICE_ASC:
        orderBy = { price: 'asc' };
        break;
      case ProductSortBy.PRICE_DESC:
        orderBy = { price: 'desc' };
        break;
      case ProductSortBy.NAME:
        orderBy = { name: 'asc' };
        break;
      case ProductSortBy.NEWEST:
      default:
        orderBy = { createdAt: 'desc' };
        break;
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: filter.skip,
        take: filter.limit,
        orderBy,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: { where: { isMain: true }, take: 1 },
          variants: {
            select: { size: true, color: true, colorCode: true, stock: true },
          },
          _count: { select: { reviews: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products.map((p) => ({
        ...p,
        mainImage: p.images[0]?.url || null,
        images: undefined,
      })),
      meta: {
        total,
        page: filter.page ?? 1,
        limit: filter.limit ?? 10,
        totalPages: Math.ceil(total / (filter.limit ?? 10)),
      },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: {
          select: { id: true, size: true, color: true, colorCode: true, stock: true, sku: true },
        },
        reviews: {
          where: { isVisible: true },
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product || !product.isActive) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }

    // Calculate average rating
    const avgRating = await this.prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: true,
    });

    return {
      ...product,
      averageRating: avgRating._avg.rating || 0,
      reviewCount: avgRating._count,
    };
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }

    return product;
  }

  // Admin methods
  async create(dto: CreateProductDto) {
    // Generate slug
    const slug = this.generateSlug(dto.name);

    // Check existing SKU
    const existingSku = await this.prisma.product.findUnique({
      where: { sku: dto.sku },
    });
    if (existingSku) {
      throw new ConflictException('SKU đã tồn tại');
    }

    // Check existing slug
    const existingSlug = await this.prisma.product.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      throw new ConflictException('Sản phẩm với tên này đã tồn tại');
    }

    const { variants, images, ...productData } = dto;

    return this.prisma.product.create({
      data: {
        ...productData,
        slug,
        variants: variants
          ? {
              create: variants.map((v, i) => ({
                ...v,
                size: v.size as Size,
                sku: `${dto.sku}-${v.size}-${i}`,
              })),
            }
          : undefined,
        images: images
          ? {
              create: images.map((img, i) => ({
                ...img,
                sortOrder: i,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findById(id);

    const { variants, images, ...updateData } = dto;

    // Update slug if name changed
    if (dto.name && dto.name !== product.name) {
      (updateData as any).slug = this.generateSlug(dto.name);
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Xóa sản phẩm thành công' };
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}

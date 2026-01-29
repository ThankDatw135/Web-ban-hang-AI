import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(tree = false) {
    if (tree) {
      // Get root categories with children
      const categories = await this.prisma.category.findMany({
        where: { parentId: null, isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
          children: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
      });

      return categories;
    }

    // Flat list
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        parent: { select: { id: true, name: true, slug: true } },
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        _count: { select: { products: true } },
      },
    });

    if (!category || !category.isActive) {
      throw new NotFoundException('Danh mục không tồn tại');
    }

    return category;
  }

  // Admin methods
  async create(dto: CreateCategoryDto) {
    const slug = this.generateSlug(dto.name);

    // Check existing slug
    const existing = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new ConflictException('Danh mục với tên này đã tồn tại');
    }

    return this.prisma.category.create({
      data: {
        ...dto,
        slug,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Danh mục không tồn tại');
    }

    const updateData: any = { ...dto };

    // Update slug if name changed
    if (dto.name && dto.name !== category.name) {
      updateData.slug = this.generateSlug(dto.name);
    }

    return this.prisma.category.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true, children: true } } },
    });

    if (!category) {
      throw new NotFoundException('Danh mục không tồn tại');
    }

    if (category._count.products > 0 || category._count.children > 0) {
      // Soft delete
      await this.prisma.category.update({
        where: { id },
        data: { isActive: false },
      });
    } else {
      // Hard delete if no products/children
      await this.prisma.category.delete({
        where: { id },
      });
    }

    return { message: 'Xóa danh mục thành công' };
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

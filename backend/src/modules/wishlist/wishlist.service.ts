import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddToWishlistDto } from "./dto";

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: string) {
    let wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                salePrice: true,
                isActive: true,
                images: { where: { isMain: true }, take: 1 },
                category: { select: { id: true, name: true, slug: true } },
              },
            },
          },
          orderBy: { addedAt: "desc" },
        },
      },
    });

    if (!wishlist) {
      // Create wishlist if not exists
      wishlist = await this.prisma.wishlist.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  price: true,
                  salePrice: true,
                  isActive: true,
                  images: { where: { isMain: true }, take: 1 },
                  category: { select: { id: true, name: true, slug: true } },
                },
              },
            },
          },
        },
      });
    }

    // Transform response
    const items = wishlist.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      addedAt: item.addedAt,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: Number(item.product.price),
        salePrice: item.product.salePrice
          ? Number(item.product.salePrice)
          : null,
        isActive: item.product.isActive,
        mainImage: item.product.images[0]?.url || null,
        category: item.product.category,
      },
    }));

    return {
      id: wishlist.id,
      items,
      totalItems: items.length,
    };
  }

  async addToWishlist(userId: string, dto: AddToWishlistDto) {
    // Verify product exists and is active
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException("Sản phẩm không tồn tại");
    }

    if (!product.isActive) {
      throw new NotFoundException("Sản phẩm hiện không khả dụng");
    }

    // Get or create wishlist
    let wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: { userId },
      });
    }

    // Check if already in wishlist
    const existingItem = await this.prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId: dto.productId,
        },
      },
    });

    if (existingItem) {
      throw new ConflictException("Sản phẩm đã có trong danh sách yêu thích");
    }

    // Add to wishlist
    await this.prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId: dto.productId,
      },
    });

    return this.getWishlist(userId);
  }

  async removeFromWishlist(userId: string, productId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      throw new NotFoundException("Danh sách yêu thích không tồn tại");
    }

    const item = await this.prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    if (!item) {
      throw new NotFoundException(
        "Sản phẩm không có trong danh sách yêu thích"
      );
    }

    await this.prisma.wishlistItem.delete({
      where: { id: item.id },
    });

    return this.getWishlist(userId);
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      return false;
    }

    const item = await this.prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    return !!item;
  }

  async toggleWishlist(userId: string, productId: string) {
    const isInWishlist = await this.isInWishlist(userId, productId);

    if (isInWishlist) {
      return this.removeFromWishlist(userId, productId);
    } else {
      return this.addToWishlist(userId, { productId });
    }
  }

  async clearWishlist(userId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });

    if (wishlist) {
      await this.prisma.wishlistItem.deleteMany({
        where: { wishlistId: wishlist.id },
      });
    }

    return {
      message: "Đã xóa danh sách yêu thích",
      items: [],
      totalItems: 0,
    };
  }
}

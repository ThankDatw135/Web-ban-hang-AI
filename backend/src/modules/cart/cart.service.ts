import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddToCartDto, UpdateCartItemDto } from "./dto";

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
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
                images: { where: { isMain: true }, take: 1 },
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                colorCode: true,
                stock: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      // Create cart if not exists
      cart = await this.prisma.cart.create({
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
                  images: { where: { isMain: true }, take: 1 },
                },
              },
              variant: {
                select: {
                  id: true,
                  size: true,
                  color: true,
                  colorCode: true,
                  stock: true,
                },
              },
            },
          },
        },
      });
    }

    // Calculate totals
    const items = cart.items.map((item) => {
      const price = item.product.salePrice || item.product.price;
      return {
        id: item.id,
        product: {
          ...item.product,
          mainImage: item.product.images[0]?.url || null,
          images: undefined,
        },
        variant: item.variant,
        quantity: item.quantity,
        unitPrice: Number(price),
        totalPrice: Number(price) * item.quantity,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      id: cart.id,
      items,
      subtotal,
      itemCount,
    };
  }

  async addItem(userId: string, dto: AddToCartDto) {
    // Verify product and variant exist
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: dto.variantId },
      include: { product: true },
    });

    if (!variant || variant.productId !== dto.productId) {
      throw new NotFoundException("Sản phẩm không tồn tại");
    }

    if (variant.stock < dto.quantity) {
      throw new BadRequestException("Số lượng vượt quá tồn kho");
    }

    // Get or create cart
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // Check if item already exists
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_variantId: {
          cartId: cart.id,
          variantId: dto.variantId,
        },
      },
    });

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + dto.quantity;
      if (newQuantity > variant.stock) {
        throw new BadRequestException("Số lượng vượt quá tồn kho");
      }

      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Add new item
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          variantId: dto.variantId,
          quantity: dto.quantity,
        },
      });
    }

    return this.getCart(userId);
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException("Giỏ hàng không tồn tại");
    }

    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
      include: { variant: true },
    });

    if (!item) {
      throw new NotFoundException("Sản phẩm không có trong giỏ hàng");
    }

    if (dto.quantity > item.variant.stock) {
      throw new BadRequestException("Số lượng vượt quá tồn kho");
    }

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });

    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException("Giỏ hàng không tồn tại");
    }

    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });

    if (!item) {
      throw new NotFoundException("Sản phẩm không có trong giỏ hàng");
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return { message: "Đã xóa giỏ hàng", items: [], subtotal: 0, itemCount: 0 };
  }
}

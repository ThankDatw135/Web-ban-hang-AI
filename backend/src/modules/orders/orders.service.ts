import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, OrderFilterDto, UpdateOrderStatusDto } from './dto';
import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    // Get cart with items
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Giỏ hàng trống');
    }

    // Verify address belongs to user
    const address = await this.prisma.address.findFirst({
      where: { id: dto.addressId, userId },
    });

    if (!address) {
      throw new NotFoundException('Địa chỉ không tồn tại');
    }

    // Check stock and calculate prices
    let subtotal = 0;
    const orderItems: any[] = [];

    for (const item of cart.items) {
      if (item.variant.stock < item.quantity) {
        throw new BadRequestException(
          `Sản phẩm "${item.product.name}" không đủ hàng`,
        );
      }

      const price = item.product.salePrice || item.product.price;
      const totalPrice = Number(price) * item.quantity;
      subtotal += totalPrice;

      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.product.name,
        productImage: null, // Will be set later
        size: item.variant.size,
        color: item.variant.color,
        quantity: item.quantity,
        unitPrice: price,
        totalPrice,
      });
    }

    // Calculate shipping fee
    const shippingFee = subtotal >= 500000 ? 0 : 30000;
    const total = subtotal + shippingFee;

    // Generate order number
    const orderNumber = await this.generateOrderNumber();

    // Create order in transaction
    const order = await this.prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId: dto.addressId,
          paymentMethod: dto.paymentMethod,
          subtotal,
          shippingFee,
          total,
          note: dto.note,
          shippingAddress: {
            fullName: address.fullName,
            phone: address.phone,
            street: address.street,
            ward: address.ward,
            district: address.district,
            city: address.city,
            province: address.province,
          },
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });

      // Update stock
      for (const item of cart.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    return order;
  }

  async findUserOrders(userId: string, filter: OrderFilterDto) {
    const where: any = { userId };

    if (filter.status) {
      where.status = filter.status;
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: filter.skip,
        take: filter.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            take: 3,
            select: {
              productName: true,
              productImage: true,
              size: true,
              color: true,
            },
          },
          _count: { select: { items: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page: filter.page ?? 1,
        limit: filter.limit ?? 10,
        totalPages: Math.ceil(total / (filter.limit ?? 10)),
      },
    };
  }

  async findById(userId: string, orderId: string, isAdmin = false) {
    const where: any = { id: orderId };
    if (!isAdmin) {
      where.userId = userId;
    }

    const order = await this.prisma.order.findFirst({
      where,
      include: {
        items: {
          include: {
            product: {
              select: { slug: true },
            },
          },
        },
        payments: true,
        address: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    return order;
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      throw new BadRequestException('Không thể hủy đơn hàng này');
    }

    // Restore stock and cancel order
    await this.prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: { increment: item.quantity },
          },
        });
      }

      await tx.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CANCELLED,
          cancelledAt: new Date(),
        },
      });
    });

    return { message: 'Đã hủy đơn hàng' };
  }

  // Admin methods
  async findAll(filter: OrderFilterDto) {
    const where: any = {};

    if (filter.status) {
      where.status = filter.status;
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: filter.skip,
        take: filter.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { email: true, firstName: true, lastName: true },
          },
          _count: { select: { items: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page: filter.page ?? 1,
        limit: filter.limit ?? 10,
        totalPages: Math.ceil(total / (filter.limit ?? 10)),
      },
    };
  }

  async updateStatus(orderId: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    const updateData: any = { status: dto.status };

    // Set timestamps based on status
    switch (dto.status) {
      case OrderStatus.SHIPPED:
        updateData.shippedAt = new Date();
        break;
      case OrderStatus.DELIVERED:
        updateData.deliveredAt = new Date();
        if (order.paymentMethod === 'COD') {
          updateData.paymentStatus = PaymentStatus.COMPLETED;
          updateData.paidAt = new Date();
        }
        break;
      case OrderStatus.CANCELLED:
        updateData.cancelledAt = new Date();
        break;
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });
  }

  private async generateOrderNumber(): Promise<string> {
    const date = new Date();
    const prefix = `FA${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

    const lastOrder = await this.prisma.order.findFirst({
      where: { orderNumber: { startsWith: prefix } },
      orderBy: { orderNumber: 'desc' },
    });

    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${String(sequence).padStart(4, '0')}`;
  }
}

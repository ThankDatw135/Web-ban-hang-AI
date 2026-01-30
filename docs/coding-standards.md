# Quy Tắc Code & Best Practices

> **Mục đích**: Đảm bảo code base chuẩn chỉnh, sạch sẽ, dễ mở rộng và bảo trì trong tương lai.

---

## 1. Nguyên Tắc Tổ Chức Code

### 1.1. Chia Nhỏ File Lớn

Khi một file service/controller vượt quá **200 lines**, cần tách thành nhiều file con.

```
# ❌ KHÔNG NÊN: File quá lớn, khó quản lý
products.service.ts (500+ lines)

# ✅ NÊN: Tách thành modules nhỏ
products/
├── products.service.ts        # Entry point, inject các service con
├── products.query.service.ts  # Các method đọc dữ liệu (findAll, findById)
├── products.admin.service.ts  # Các method admin (create, update, delete)
├── products.cache.service.ts  # Logic caching
└── products.utils.ts          # Hàm tiện ích (generateSlug, formatPrice)
```

### 1.2. Quy Tắc Đặt Tên File

| Loại File     | Quy Tắc                           | Ví Dụ                       |
| ------------- | --------------------------------- | --------------------------- |
| Service chính | `{module}.service.ts`             | `products.service.ts`       |
| Service con   | `{module}.{chức-năng}.service.ts` | `products.query.service.ts` |
| Controller    | `{module}.controller.ts`          | `products.controller.ts`    |
| DTO           | `{tên-dto}.dto.ts`                | `create-product.dto.ts`     |
| Guard         | `{tên}.guard.ts`                  | `jwt-auth.guard.ts`         |
| Interceptor   | `{tên}.interceptor.ts`            | `response.interceptor.ts`   |

---

## 2. Ghi Chú Code (Comments)

### 2.1. Ghi Chú Tiếng Việt

Sử dụng tiếng Việt để người đọc dễ hiểu:

```typescript
// ✅ GHI CHÚ ĐÚNG CÁCH

/**
 * Tìm kiếm sản phẩm với các bộ lọc
 * @param filter - Các tham số lọc: category, price, size, color
 * @returns Danh sách sản phẩm và thông tin phân trang
 *
 * // Ghi chú tiến độ triển khai:
 * // [x] Lọc theo category - DONE 29/01/2026
 * // [x] Lọc theo giá - DONE 29/01/2026
 * // [ ] Full-text search - PENDING
 */
async findAll(filter: ProductFilterDto) {
  // Khởi tạo điều kiện where mặc định
  const where: Prisma.ProductWhereInput = {
    isActive: true, // Chỉ lấy sản phẩm đang hoạt động
  };

  // Tìm kiếm theo tên hoặc mô tả
  if (filter.search) {
    where.OR = [
      { name: { contains: filter.search, mode: 'insensitive' } },
      { description: { contains: filter.search, mode: 'insensitive' } },
    ];
  }

  // Lọc theo danh mục (bao gồm cả danh mục con)
  if (filter.category) {
    where.category = {
      OR: [
        { slug: filter.category },
        { parent: { slug: filter.category } }, // Danh mục con
      ],
    };
  }

  // ... tiếp tục logic
}
```

### 2.2. Đánh Dấu Tiến Độ

```typescript
// Sử dụng các prefix để đánh dấu trạng thái

// TODO: Cần làm trong tương lai
// FIXME: Có bug cần sửa
// HACK: Giải pháp tạm thời, cần refactor
// NOTE: Ghi chú quan trọng
// REVIEW: Cần review lại
// OPTIMIZE: Có thể tối ưu thêm

// Ví dụ:
// TODO: Thêm caching cho danh sách sản phẩm - Deadline: 01/02/2026
// FIXME: Bug khi filter size = null - Issue #123
// OPTIMIZE: Query này có thể dùng raw SQL để tăng tốc
```

---

## 3. Cấu Trúc Service

### 3.1. Dependency Injection

```typescript
// ✅ ĐÚNG: Inject các service con vào service chính

@Injectable()
export class ProductsService {
  constructor(
    private readonly queryService: ProductsQueryService, // Đọc dữ liệu
    private readonly adminService: ProductsAdminService, // Admin operations
    private readonly cacheService: ProductsCacheService, // Caching
  ) {}

  // Delegate sang service con
  async findAll(filter: ProductFilterDto) {
    return this.queryService.findAll(filter);
  }

  async create(dto: CreateProductDto) {
    return this.adminService.create(dto);
  }
}
```

### 3.2. Tách Logic Business

```typescript
// ✅ ĐÚNG: Mỗi method làm một việc duy nhất

// File: products.query.service.ts
@Injectable()
export class ProductsQueryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy danh sách sản phẩm với phân trang
   * Dữ liệu được cache 5 phút trong Redis
   */
  async findAll(filter: ProductFilterDto) {
    const where = this.buildWhereClause(filter); // Tách logic build where
    const orderBy = this.buildOrderBy(filter); // Tách logic sort

    return this.executeQuery(where, orderBy, filter);
  }

  /**
   * Build điều kiện WHERE từ filter
   * @private - Method này chỉ dùng internal
   */
  private buildWhereClause(filter: ProductFilterDto): Prisma.ProductWhereInput {
    // Logic xây dựng điều kiện...
  }

  /**
   * Build điều kiện ORDER BY
   */
  private buildOrderBy(
    filter: ProductFilterDto,
  ): Prisma.ProductOrderByWithRelationInput {
    // Logic xây dựng sort order...
  }
}
```

---

## 4. Error Handling

### 4.1. Custom Exceptions

```typescript
// Tạo exception riêng cho từng loại lỗi

// File: common/exceptions/product-not-found.exception.ts
export class ProductNotFoundException extends NotFoundException {
  constructor(productId: string) {
    super(`Sản phẩm với ID ${productId} không tồn tại`);
  }
}

// Sử dụng:
if (!product) {
  throw new ProductNotFoundException(id);
}
```

### 4.2. Try-Catch có ý nghĩa

```typescript
// ✅ ĐÚNG: Log lỗi chi tiết, throw lỗi có nghĩa

async create(dto: CreateProductDto) {
  try {
    return await this.prisma.product.create({ data: dto });
  } catch (error) {
    // Log lỗi để debug
    this.logger.error(`Lỗi tạo sản phẩm: ${error.message}`, error.stack);

    // Phân loại lỗi để trả về message phù hợp
    if (error.code === 'P2002') {
      throw new ConflictException('SKU hoặc slug đã tồn tại');
    }

    throw new InternalServerErrorException('Không thể tạo sản phẩm');
  }
}
```

---

## 5. Database Queries

### 5.1. Select Chỉ Field Cần Thiết

```typescript
// ❌ KHÔNG NÊN: Lấy toàn bộ field
const products = await this.prisma.product.findMany();

// ✅ NÊN: Chỉ lấy field cần dùng
const products = await this.prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    images: {
      where: { isMain: true },
      take: 1,
      select: { url: true },
    },
  },
});
```

### 5.2. Sử Dụng Transaction

```typescript
// Khi update nhiều bảng cùng lúc, dùng transaction
async createOrder(userId: string, dto: CreateOrderDto) {
  return this.prisma.$transaction(async (tx) => {
    // 1. Tạo order
    const order = await tx.order.create({ data: { userId, ...orderData } });

    // 2. Tạo order items
    await tx.orderItem.createMany({ data: orderItems });

    // 3. Cập nhật stock
    for (const item of orderItems) {
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // 4. Xóa cart
    await tx.cartItem.deleteMany({ where: { cart: { userId } } });

    return order;
  });
}
```

---

## 6. Testing

### 6.1. Đặt Tên Test Rõ Ràng

```typescript
describe("ProductsService", () => {
  describe("findAll", () => {
    it("nên trả về danh sách sản phẩm với phân trang", async () => {
      // Test code...
    });

    it("nên lọc theo category khi có filter.category", async () => {
      // Test code...
    });

    it("nên throw NotFoundException khi không tìm thấy sản phẩm", async () => {
      // Test code...
    });
  });
});
```

---

## 7. Checklist Trước Khi Commit

- [ ] Code không có lỗi TypeScript (`npm run build`)
- [ ] Đã thêm ghi chú tiếng Việt cho logic phức tạp
- [ ] File không quá 200 lines (nếu lớn hơn, tách nhỏ)
- [ ] Đã select chỉ các field cần thiết trong query
- [ ] Đã handle error với message tiếng Việt
- [ ] Đã thêm TODO/FIXME nếu còn việc chưa hoàn thành

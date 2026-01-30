import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { OrdersService } from "./orders.service";
import { CreateOrderDto, OrderFilterDto, UpdateOrderStatusDto } from "./dto";
import { CurrentUser, AuthAdmin } from "@/common/decorators";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Tạo đơn hàng từ giỏ hàng" })
  @ApiResponse({ status: 201, description: "Đơn hàng đã tạo" })
  create(@CurrentUser("id") userId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy danh sách đơn hàng của user" })
  findUserOrders(
    @CurrentUser("id") userId: string,
    @Query() filter: OrderFilterDto,
  ) {
    return this.ordersService.findUserOrders(userId, filter);
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy chi tiết đơn hàng" })
  findById(@CurrentUser("id") userId: string, @Param("id") id: string) {
    return this.ordersService.findById(userId, id);
  }

  @Post(":id/cancel")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Hủy đơn hàng" })
  cancelOrder(@CurrentUser("id") userId: string, @Param("id") id: string) {
    return this.ordersService.cancelOrder(userId, id);
  }

  // Admin endpoints
  @Get("admin/all")
  @AuthAdmin()
  @ApiOperation({ summary: "[Admin] Lấy tất cả đơn hàng" })
  findAll(@Query() filter: OrderFilterDto) {
    return this.ordersService.findAll(filter);
  }

  @Get("admin/:id")
  @AuthAdmin()
  @ApiOperation({ summary: "[Admin] Lấy chi tiết đơn hàng" })
  adminFindById(@Param("id") id: string) {
    return this.ordersService.findById("", id, true);
  }

  @Patch("admin/:id/status")
  @AuthAdmin()
  @ApiOperation({ summary: "[Admin] Cập nhật trạng thái đơn hàng" })
  updateStatus(@Param("id") id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }
}

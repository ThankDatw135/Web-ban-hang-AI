import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductFilterDto, CreateProductDto, UpdateProductDto } from './dto';
import { AuthAdmin } from '@/common/decorators';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm với filter' })
  @ApiResponse({ status: 200, description: 'Danh sách sản phẩm' })
  findAll(@Query() filter: ProductFilterDto) {
    return this.productsService.findAll(filter);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm theo slug' })
  @ApiResponse({ status: 200, description: 'Chi tiết sản phẩm' })
  @ApiResponse({ status: 404, description: 'Sản phẩm không tồn tại' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // Admin endpoints
  @Post()
  @AuthAdmin()
  @ApiOperation({ summary: '[Admin] Tạo sản phẩm mới' })
  @ApiResponse({ status: 201, description: 'Sản phẩm đã tạo' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @AuthAdmin()
  @ApiOperation({ summary: '[Admin] Cập nhật sản phẩm' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @AuthAdmin()
  @ApiOperation({ summary: '[Admin] Xóa sản phẩm' })
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}

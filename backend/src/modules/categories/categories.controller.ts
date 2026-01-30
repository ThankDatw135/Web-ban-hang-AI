import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { AuthAdmin } from "@/common/decorators";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách danh mục" })
  @ApiQuery({ name: "tree", required: false, type: Boolean })
  @ApiResponse({ status: 200, description: "Danh sách danh mục" })
  findAll(@Query("tree") tree?: string) {
    return this.categoriesService.findAll(tree === "true");
  }

  @Get(":slug")
  @ApiOperation({ summary: "Lấy chi tiết danh mục theo slug" })
  @ApiResponse({ status: 200, description: "Chi tiết danh mục" })
  @ApiResponse({ status: 404, description: "Danh mục không tồn tại" })
  findBySlug(@Param("slug") slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  // Admin endpoints
  @Post()
  @AuthAdmin()
  @ApiOperation({ summary: "[Admin] Tạo danh mục mới" })
  @ApiResponse({ status: 201, description: "Danh mục đã tạo" })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch(":id")
  @AuthAdmin()
  @ApiOperation({ summary: "[Admin] Cập nhật danh mục" })
  update(@Param("id") id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(":id")
  @AuthAdmin()
  @ApiOperation({ summary: "[Admin] Xóa danh mục" })
  delete(@Param("id") id: string) {
    return this.categoriesService.delete(id);
  }
}

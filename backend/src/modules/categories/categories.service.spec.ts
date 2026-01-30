/**
 * Unit Tests cho CategoriesService
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException, ConflictException } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { PrismaService } from "../prisma/prisma.service";
import { CacheService, CACHE_TTL } from "../redis/cache.service";

// Mock PrismaService với DeepMockProxy
const mockPrismaService = {
  category: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

// Mock CacheService
const mockCacheService = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  deleteByPattern: jest.fn(),
};

describe("CategoriesService", () => {
  let service: CategoriesService;

  // Mock data
  const mockCategories = [
    { id: "1", name: "Áo", slug: "ao", isActive: true, sortOrder: 0 },
    { id: "2", name: "Quần", slug: "quan", isActive: true, sortOrder: 1 },
  ];

  const mockCategory = {
    id: "1",
    name: "Áo",
    slug: "ao",
    description: "Áo các loại",
    isActive: true,
    parent: null,
    children: [],
    _count: { products: 10 },
  };

  beforeEach(async () => {
    // Reset all mocks
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: CacheService, useValue: mockCacheService },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  describe("findAll", () => {
    it("should return categories from cache if available", async () => {
      mockCacheService.get.mockResolvedValue(mockCategories);

      const result = await service.findAll(false);

      expect(mockCacheService.get).toHaveBeenCalledWith("categories:flat");
      expect(mockPrismaService.category.findMany).not.toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });

    it("should fetch from DB and cache if not in cache", async () => {
      mockCacheService.get.mockResolvedValue(null);
      mockPrismaService.category.findMany.mockResolvedValue(mockCategories);

      const result = await service.findAll(false);

      expect(mockPrismaService.category.findMany).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalledWith(
        "categories:flat",
        mockCategories,
        CACHE_TTL.CATEGORIES,
      );
      expect(result).toEqual(mockCategories);
    });
  });

  describe("findBySlug", () => {
    it("should return category by slug", async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);

      const result = await service.findBySlug("ao");

      expect(result).toEqual(mockCategory);
    });

    it("should throw NotFoundException if not found", async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(null);

      await expect(service.findBySlug("not-exist")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("create", () => {
    it("should create a new category", async () => {
      const dto = { name: "Váy", description: "Váy các loại" };
      mockPrismaService.category.findUnique.mockResolvedValue(null);
      mockPrismaService.category.create.mockResolvedValue({
        id: "3",
        ...dto,
        slug: "vay",
        isActive: true,
      });

      const result = await service.create(dto);

      expect(mockCacheService.deleteByPattern).toHaveBeenCalledWith(
        "categories:*",
      );
      expect(result.slug).toBe("vay");
    });

    it("should throw ConflictException if slug exists", async () => {
      const dto = { name: "Áo" };
      mockPrismaService.category.findUnique.mockResolvedValue(
        mockCategories[0],
      );

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });
});

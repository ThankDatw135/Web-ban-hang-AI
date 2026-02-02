/**
 * Fashion AI - Danh Sách Sản Phẩm
 * 
 * Trang hiển thị sản phẩm với filter và sort
 */

'use client';

import { Filter, Grid3X3, List, ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// Mock data - sản phẩm mẫu
const products = [
  { id: 1, name: 'Áo sơ mi trắng Premium', price: 850000, originalPrice: 1200000, category: 'Áo', isNew: true },
  { id: 2, name: 'Đầm dự tiệc sang trọng', price: 1250000, originalPrice: null, category: 'Đầm', isNew: false },
  { id: 3, name: 'Áo khoác denim phong cách', price: 950000, originalPrice: 1100000, category: 'Áo khoác', isNew: true },
  { id: 4, name: 'Quần tây navy công sở', price: 750000, originalPrice: null, category: 'Quần', isNew: false },
  { id: 5, name: 'Váy midi họa tiết', price: 680000, originalPrice: 850000, category: 'Váy', isNew: false },
  { id: 6, name: 'Áo thun basic cotton', price: 350000, originalPrice: null, category: 'Áo', isNew: true },
  { id: 7, name: 'Blazer oversized', price: 1450000, originalPrice: null, category: 'Áo khoác', isNew: false },
  { id: 8, name: 'Quần jeans skinny', price: 650000, originalPrice: 800000, category: 'Quần', isNew: false },
];

// Danh mục filter
const categories = ['Tất cả', 'Áo', 'Quần', 'Đầm', 'Váy', 'Áo khoác', 'Phụ kiện'];
const sortOptions = ['Mới nhất', 'Giá thấp đến cao', 'Giá cao đến thấp', 'Bán chạy'];

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-app">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Sản phẩm</h1>
            <p className="text-secondary">Hiển thị {products.length} sản phẩm</p>
          </div>
          
          {/* Sort & View */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="h-10 pl-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#25221d] text-sm outline-none focus:border-primary appearance-none cursor-pointer">
                {sortOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="hidden md:flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-full p-1">
              <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </h3>
                <button className="text-sm text-primary hover:underline">Xóa tất cả</button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Danh mục</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Khoảng giá</h4>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Từ" 
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary"
                  />
                  <span className="text-secondary">-</span>
                  <input 
                    type="number" 
                    placeholder="Đến" 
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2822] text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              
              {/* Size */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button 
                      key={size}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Apply button */}
              <button className="btn-primary w-full h-11 text-sm">
                Áp dụng
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile filter button */}
            <button className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium">
              <Filter className="w-4 h-4" />
              Bộ lọc
            </button>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="card overflow-hidden group">
                  {/* Image */}
                  <Link href={`/products/${product.id}`} className="block relative aspect-product bg-gray-100 dark:bg-[#2c2822]">
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600">
                      <span className="text-4xl">👕</span>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-2 py-1 rounded-full bg-accent text-white text-xs font-bold">Mới</span>
                      )}
                      {product.originalPrice && (
                        <span className="px-2 py-1 rounded-full bg-error text-white text-xs font-bold">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    
                    {/* Wishlist button */}
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-[#25221d]/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                      <Heart className="w-4 h-4" />
                    </button>
                    
                    {/* Quick add button */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-full h-10 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Thêm vào giỏ
                      </button>
                    </div>
                  </Link>
                  
                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-secondary mb-1">{product.category}</p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-medium text-sm line-clamp-2 mb-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-secondary text-sm line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load more */}
            <div className="text-center mt-12">
              <button className="btn-outline">
                Xem thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

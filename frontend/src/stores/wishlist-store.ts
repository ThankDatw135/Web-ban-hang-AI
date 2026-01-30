/**
 * Wishlist Store - Fashion AI
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  image: string;
  match?: number;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          // Check if already exists
          if (state.items.some((i) => i.productId === item.productId)) {
            return state;
          }
          return {
            items: [
              ...state.items,
              {
                ...item,
                id: crypto.randomUUID(),
                addedAt: new Date().toISOString(),
              },
            ],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      isInWishlist: (productId) => get().items.some((i) => i.productId === productId),
      toggleItem: (item) => {
        const isInList = get().isInWishlist(item.productId);
        if (isInList) {
          get().removeItem(item.productId);
        } else {
          get().addItem(item);
        }
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

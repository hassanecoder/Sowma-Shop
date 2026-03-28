import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductSummary } from '@workspace/api-client-react';

export interface CartItem {
  product: ProductSummary;
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  favorites: ProductSummary[];
  
  // Cart Actions
  addToCart: (product: ProductSummary, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  // Favorites Actions
  toggleFavorite: (product: ProductSummary) => void;
  isFavorite: (productId: number) => boolean;
  
  // Getters
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cart.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (product) => {
        set((state) => {
          const exists = state.favorites.some((f) => f.id === product.id);
          if (exists) {
            return { favorites: state.favorites.filter((f) => f.id !== product.id) };
          }
          return { favorites: [...state.favorites, product] };
        });
      },

      isFavorite: (productId) => {
        return get().favorites.some((f) => f.id === productId);
      },

      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'sowma-shop-storage',
    }
  )
);

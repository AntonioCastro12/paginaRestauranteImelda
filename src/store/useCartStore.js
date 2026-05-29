import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const buildCartItem = (config) => ({
  id: `${config.product.id}-${Date.now()}`,
  productId: config.product.id,
  name: config.product.name,
  basePrice: config.product.price,
  extras: config.extras,
  extrasTotal: config.extras.reduce((sum, item) => sum + item.price, 0),
  total: config.total,
  quantity: 1,
});

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      addItem: (config) =>
        set((state) => ({
          items: [...state.items, buildCartItem(config)],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
      markHydrated: () => set({ hydrated: true }),
      getItemCount: () => get().items.length,
      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.total * item.quantity, 0),
    }),
    {
      name: "dona-imelda-cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);

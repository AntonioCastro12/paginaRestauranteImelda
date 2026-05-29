import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const buildFingerprint = (config) =>
  JSON.stringify({
    productId: config.product.id,
    extras: config.extras.map((item) => item.id).sort(),
    total: config.total,
  });

const buildCartItem = (config) => ({
  id: `${config.product.id}-${Date.now()}`,
  fingerprint: buildFingerprint(config),
  productId: config.product.id,
  name: config.product.name,
  basePrice: config.product.price,
  extras: config.extras,
  extrasTotal: config.extras.reduce((sum, item) => sum + item.price, 0),
  total: config.total,
  quantity: config.quantity ?? 1,
});

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      addItem: (config) =>
        set((state) => {
          const fingerprint = buildFingerprint(config);
          const existingItem = state.items.find(
            (item) => item.fingerprint === fingerprint,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.fingerprint === fingerprint
                  ? { ...item, quantity: item.quantity + (config.quantity ?? 1) }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, buildCartItem(config)],
          };
        }),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
      markHydrated: () => set({ hydrated: true }),
      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
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

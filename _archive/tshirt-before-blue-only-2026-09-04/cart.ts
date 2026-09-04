import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { currentPriceForId } from "@/lib/products";

export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string, variant: string) => void;
  updateQty: (id: string, variant: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.variant === item.variant
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.variant === item.variant
                  ? { ...i, qty: i.qty + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, qty: 1 }] };
        });
      },
      removeItem: (id, variant) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.variant === variant)
          ),
        }));
      },
      updateQty: (id, variant, qty) => {
        if (qty <= 0) {
          get().removeItem(id, variant);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.variant === variant ? { ...i, qty } : i
          ),
        }));
      },
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    {
      name: "abc-cart",
      storage: createJSONStorage(() => localStorage),
      // Only the items array is worth persisting — the methods are recreated.
      partialize: (state) => ({ items: state.items }),
    }
  )
);

/**
 * True once zustand has finished reading localStorage.
 *
 * Needed because the server renders with an empty cart, then the client
 * rehydrates. Any component that redirects on an empty cart MUST wait for
 * this, or it will bounce the user away before their cart has loaded.
 */
export function useCartHydrated() {
  // The client-only persist API is not guaranteed to exist while Next.js
  // prerenders framework pages such as `/_not-found`. Keep the server render
  // deterministic and let the client effect observe the real API.
  const [hydrated, setHydrated] = useState(
    () => useCart.persist?.hasHydrated?.() ?? false
  );

  useEffect(() => {
    const persistApi = useCart.persist;
    if (!persistApi) {
      setHydrated(true);
      return;
    }
    const unsubFinish = persistApi.onFinishHydration(() => setHydrated(true));
    // Covers the case where hydration already finished before we subscribed.
    setHydrated(persistApi.hasHydrated());
    if (persistApi.hasHydrated()) {
      useCart.setState((state) => ({
        items: state.items
          .map((item) => {
            const currentPrice = currentPriceForId(item.id);
            return currentPrice === null ? null : { ...item, price: currentPrice };
          })
          .filter((item): item is CartItem => item !== null),
      }));
    }
    return unsubFinish;
  }, []);

  return hydrated;
}

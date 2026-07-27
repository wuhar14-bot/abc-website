import { create } from "zustand";

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

export const useCart = create<CartStore>((set, get) => ({
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
      items: state.items.filter((i) => !(i.id === id && i.variant === variant)),
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
}));

import { create } from "zustand";
import { Item } from "../lib/firestore/interfaces";

type ItemsStore = {
  items?: Item[];
  setItems: (items: Item[]) => void;
};

export const useItemsStore = create<ItemsStore>((set) => ({
  items: undefined,
  setItems: (items) => set({ items }),
}));

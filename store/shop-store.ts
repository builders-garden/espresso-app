import { create } from "zustand";
import { Shop } from "../lib/firestore/interfaces";

type ShopStore = {
  shop?: Shop;
  setShop: (shop: Shop) => void;
};

export const useShopStore = create<ShopStore>((set) => ({
  shop: undefined,
  setShop: (shop) => set({ shop }),
}));

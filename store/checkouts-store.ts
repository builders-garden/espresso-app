import { create } from "zustand";
import { Checkout, Item } from "../lib/firestore/interfaces";

type CheckoutStore = {
  checkouts?: Checkout[];
  setCheckouts: (checkouts: Checkout[]) => void;
};

export const useCheckoutsStore = create<CheckoutStore>((set) => ({
  checkouts: undefined,
  setCheckouts: (checkouts) => set({ checkouts }),
}));

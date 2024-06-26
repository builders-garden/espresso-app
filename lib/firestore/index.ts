import {
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { firebaseFirestore, firebaseAuth } from "../../firebaseConfig";
import { Checkout, Item, Shop } from "./interfaces";

export const getShop = async () => {
  // get user and set it in the store
  return await getDoc(
    doc(firebaseFirestore, "shops", firebaseAuth.currentUser!.uid)
  );
};

export const setDBShop = async (shop: Shop) => {
  // set shop in firestore
  await setDoc(
    doc(firebaseFirestore, "shops", firebaseAuth.currentUser!.uid),
    shop
  );
};

export const getItems = async (shopId: string) => {
  const q = query(
    collection(firebaseFirestore, "items"),
    where("shopId", "==", shopId)
  );
  const docs = await getDocs(q);
  // get items from shop
  const items = docs.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as unknown as Item;
  });
  return items;
};

export const addItem = async (item: Omit<Item, "id">) => {
  // add item to shop
  return await addDoc(collection(firebaseFirestore, "items"), item);
};

export const removeItem = async (itemId: string) => {
  // remove item from shop
  await deleteDoc(doc(firebaseFirestore, "items", itemId));
};

export const getCheckout = async (checkoutId: string) => {
  // get checkout from shop
  return await getDoc(doc(firebaseFirestore, "checkouts", checkoutId));
};

export const addCheckout = async (checkout: Omit<Checkout, "id">) => {
  // add checkout to shop
  return await addDoc(collection(firebaseFirestore, "checkouts"), checkout);
};

export const removeCheckout = async (checkoutId: string) => {
  // remove checkout from shop
  return await deleteDoc(doc(firebaseFirestore, "checkouts", checkoutId));
};

export const getCheckouts = async (shopId: string) => {
  const q = query(
    collection(firebaseFirestore, "checkouts"),
    where("shopId", "==", shopId)
  );
  const docs = await getDocs(q);
  // get items from shop
  const checkouts = docs.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as unknown as Checkout;
  });
  return checkouts;
};

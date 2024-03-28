export interface Item {
  id: string;
  name: string;
  price: number;
  emoji?: string;
}

export interface CheckoutItems {
  item: Item;
  quantity: number;
}

export interface Shop {
  id: string;
  walletAddress: string;
  name: string;
  city: string;
  country: string;
  address: string;
}

import type { IProduct } from "./product.type";

export interface ICart {
  _id: string;
  session_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  _id: string;
  cart_id: string;
  product_id: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartWithItems {
  cart: ICart;
  items: ICartItem[];
}

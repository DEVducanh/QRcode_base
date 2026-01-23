import type { IProduct } from "./product.type";
import type { ISession } from "./session";

export interface IOrder {
  _id?: string;
  session_id: string;
  total_price: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IOrderItem {
  _id?: string;
  order_id: string;
  product_id: IProduct;
  quantity: number;
  price: number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IOrderResponse {
  _id?: string;
  total_price: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  session_id: ISession;
  items: IOrderItem[];
}

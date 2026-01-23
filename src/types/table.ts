import type { ICart } from "./cart.type";
import type { ISession } from "./session";

export interface Table {
  _id?: string;
  table_number: string;
  table_code: string;
  status?: string;
  capacity?: number;
}

export interface TableResponse {
  table: Table;
  session: ISession;
  cart: ICart;
}

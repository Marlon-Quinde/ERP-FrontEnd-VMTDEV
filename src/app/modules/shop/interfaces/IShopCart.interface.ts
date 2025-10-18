import { IProduct } from "../../product/interfaces/IProduct.interface";

export interface IShopCart extends IProduct {
  cantidad: number
  total?: number
}

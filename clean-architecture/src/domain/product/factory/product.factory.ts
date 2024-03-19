import { v4 as uuid } from "uuid";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static create(name: string, price: number): Product {
    return new Product(uuid(), name, price);
  }
}

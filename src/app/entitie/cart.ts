import { Product } from "./product";

export class Cart {
    product!: Product;
    qty!: number;
    subtotal!: number;
    iva!: number;
    total!: number;
}
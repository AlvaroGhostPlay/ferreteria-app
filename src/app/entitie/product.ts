import { Brand } from "./brand";
import { Category } from "./category";

export class Product {
    productId!: string;
    productName!:string;
    descriptionProduct!: string;
    category!:Category;
    price!: number;
    iva!: number;
    stock!: number;
    brand!: Brand;
    expirationDate!: Date;
    image!: string;
    code!: string;
}
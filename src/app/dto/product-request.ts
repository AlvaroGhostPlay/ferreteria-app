export class ProductRequest{
    productId!: string | null;
    productName!: string;
    descriptionProduct!: string;
    idCategory!: string;
    price!: number;
    iva!: number;
    stock!: number;
    idBrand!: string;
    expirationDate!: Date;
    image!:string;
    code!: string;
}
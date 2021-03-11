import { ProductCategory } from "./product-category";


export class Product {
    public constructor(
        public _id?: String,
        public product_name?: String,
        public category?: ProductCategory,
        public price?: String,
        public product_img?: String
    ) { }
}

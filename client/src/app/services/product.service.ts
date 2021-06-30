import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product'
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public searchValue: string;
  public products: Product[] = [];
  public categories: ProductCategory[] = [];

  constructor(public http: HttpClient) { }

  public getAllProducts() {
    return this.http.get('http://localhost:3000/products').subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.products;
      },
      (err) => console.log(err)
    );
  }
  public getAllCategories() {
    return this.http.get('http://localhost:3000/category').subscribe(
      (res: any) => {
        this.categories = res.category
      },
      (err) => console.log(err)
    );
  }

  public getAllCategoriesNew() {
    return this.http.get<any>('http://localhost:3000/category');
  }


  public getProductByCategory(id: string) {
    return this.http.get(`http://localhost:3000/category/byCategory/${id}`).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.Products
      },
      (err) => console.log(err)
    );
  }

  public addProduct(prod:Product){
    return this.http.post('http://localhost:3000/products/new',prod);
  }
  public deleteProduct(prod:Product){
    const id = prod._id;
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

}
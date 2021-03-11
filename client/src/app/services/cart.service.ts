import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItems: CartItem[] = [];

  constructor(public _productService: ProductService) { }
}

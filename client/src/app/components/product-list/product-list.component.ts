import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  constructor(public _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getAllProducts()
  }
  handleRemoveProduct($product:Product){
    let isRemoving = confirm("Are you sure you want to remove this product from the products list?")
    if(isRemoving){
     this._productService.deleteProduct($product).subscribe((item)=>{
        this._productService.getAllProducts()
     },(err)=>{
       alert(err);
     })
    }
    
  }

}

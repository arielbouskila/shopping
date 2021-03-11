import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product'
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  constructor(public _msgService: MessengerService) { }

  ngOnInit(): void {
  }

  hendleAddToCart() {
    this._msgService.sendMsg(this.product)
  }
}

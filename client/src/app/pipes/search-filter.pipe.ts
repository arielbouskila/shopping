import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(products: Product[], searchValue: string): Product[] {

    if (!products || !searchValue) {
      return products;
    }
    return products.filter(product =>
      product.product_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}

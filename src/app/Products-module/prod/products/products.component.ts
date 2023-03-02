import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Iproduct[] = []

  constructor(private prodAPIService: ProductsAPIService) { }

  ngOnInit(): void {
    // this.prodAPIService.getProductesOfSub().subscribe((data: Iproduct[]) => {

    //   this.products = data
      // console.log(this.products);
      
    // })
  }


}

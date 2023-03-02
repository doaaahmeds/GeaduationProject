import { Component } from '@angular/core';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  AllCat:Iproduct[]=[];
   constructor(private prodAPIService:ProductsAPIService ){}

   AllCategory(){

   }
}

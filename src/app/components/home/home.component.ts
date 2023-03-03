import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  links:string[]=['cgCpnqSfoejbeTYqAxQE','vBEYRuSj9Us4ZPPUbg13'];
  AllCat:Iproduct[]=[];
   constructor(private prodAPIService:ProductsAPIService,private router:Router ) {}
  ngOnInit(): void {
    this.prodAPIService.getAllProductes().subscribe(data=>{
      this.AllCat=data;
    })
  }

   AllCategory(){

   }
}

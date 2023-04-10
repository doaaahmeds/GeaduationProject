import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IsubCategory } from 'src/app/models/isub-category';
import { CartService } from 'src/app/services/cart.service';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import {TranslateService} from "@ngx-translate/core";
import { LocalstorageeService } from 'src/app/services/localstoragee.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoryofBags : IsubCategory[] | undefined = undefined;
  subCategoryofShose : IsubCategory[] | undefined = undefined;
  lang:string='';

  constructor(private getSubCatServ:ProductsAPIService , private router:Router ,private translateservice: TranslateService,private localstorage:LocalstorageeService){
    this.lang = this.localstorage.getStatus();
  }
  
  ngOnInit(): void {
    this.localstorage.watchStorage().subscribe(() => {
      this.lang = this.localstorage.getStatus();
      console.log(this.lang+'from header');
    })
    this.getSubCatServ.getAllsubCatOfBags().subscribe((data: IsubCategory[])=>{
      this.subCategoryofBags = data
      // console.log(data);
    })

    this.getSubCatServ.getAllsubCatOfshose().subscribe((data: IsubCategory[])=>{
      this.subCategoryofShose=data
    })




  }
  // getprodSub(subCatId : string){

  //   console.log("jjjjjj");
  //   console.log(subCatId);

  //   // this.router.navigate(['products'])

  // }





}

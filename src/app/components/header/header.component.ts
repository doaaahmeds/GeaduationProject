import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IsubCategory } from 'src/app/models/isub-category';
import { CartService } from 'src/app/services/cart.service';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import {TranslateService} from "@ngx-translate/core";

import { LocalstorageeService } from 'src/app/services/localstoragee.service';

import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoryofBags : IsubCategory[] | undefined = undefined;
  subCategoryofShose : IsubCategory[] | undefined = undefined;

  lang:string='';

  constructor(private getSubCatServ:ProductsAPIService , private router:Router ,private translateservice: TranslateService,private localstorage:LocalstorageeService,private searchService :SearchService){
    this.lang = this.localstorage.getStatus();
  }
  
  isSearch : boolean = false;
  

 
  translatee(event:any){
    this.translateservice.use(event.target.value);
    console.log(event.target.value);
  


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



  
  showSearch(){
    this.isSearch=!this.isSearch
    }
    
    goToSearch(value : string){
      this.searchService.setvalueOfSearch(value)

      // console.log(value);
      console.log(  this.searchService.valueOfSearch);
      
      this.router.navigate(['/search']);
      this.isSearch=false;

    }



}

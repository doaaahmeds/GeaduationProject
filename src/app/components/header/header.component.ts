import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoryofBags : IsubCategory[] | undefined = undefined;
  subCategoryofShose : IsubCategory[] | undefined = undefined;


  constructor(private getSubCatServ:ProductsAPIService , private router:Router ,private translateservice: TranslateService){}
  translatee(event:any){
    this.translateservice.use(event.target.value);
    console.log(event.target.value);

  }
  ngOnInit(): void {
   
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

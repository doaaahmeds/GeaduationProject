import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoryofBags : IsubCategory[] | undefined = undefined;
  subCategoryofShose : IsubCategory[] | undefined = undefined;


  constructor(private getSubCatServ:ProductsAPIService , private router:Router){}

  ngOnInit(): void {
   
    this.getSubCatServ.getAllsubCatOfBags().subscribe((data: IsubCategory[])=>{
      this.subCategoryofBags = data
      // console.log(data);
    })

    this.getSubCatServ.getAllsubCatOfshose().subscribe((data: IsubCategory[])=>{
      this.subCategoryofShose=data
    })
    
 

  }


 
  



}

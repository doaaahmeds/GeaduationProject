import { Component, OnInit } from '@angular/core';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoryofBags : IsubCategory[]=[]
  subCategoryofShose : IsubCategory[]=[];

  constructor(private getSubCatServ:ProductsAPIService){}

  ngOnInit(): void {
   
    this.getSubCatServ.getAllsubCatOfBags().subscribe(data=>{

      this.subCategoryofBags = data
      console.log(data);
      
    })

    this.getSubCatServ.getAllsubCatOfshose().subscribe(data=>{
      this.subCategoryofShose=data
    })
    

  }



}

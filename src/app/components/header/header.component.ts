import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IsubCategory } from 'src/app/models/isub-category';
import { CartService } from 'src/app/services/cart.service';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoryofBags : IsubCategory[] | undefined = undefined;
  subCategoryofShose : IsubCategory[] | undefined = undefined;
  isOpen:boolean = false;
  @Output() openCart:EventEmitter<boolean>;

  constructor(private getSubCatServ:ProductsAPIService , private router:Router){
    this.openCart = new EventEmitter<boolean>();
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

  OpenCartFun()
  {
    this.isOpen = !this.isOpen;
    this.openCart.emit(this.isOpen);
  }



}

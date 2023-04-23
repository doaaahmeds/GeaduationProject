import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import {TranslateService} from "@ngx-translate/core";
import { LocalstorageeService } from 'src/app/services/localstoragee.service';
import { SearchService } from 'src/app/services/search/search.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoryofBags : IsubCategory[] | undefined = undefined;
  subCategoryofShose : IsubCategory[] | undefined = undefined;
  isSearch : boolean = false;
  totalPrice = this.cartService.getTotalPrice();
  isOpen:boolean = false;

  @Output() openCart:EventEmitter<boolean>;

  lang:string='';

  constructor(public authService : AuthenticationService, private getSubCatServ:ProductsAPIService , private router:Router ,private translateservice: TranslateService,
    private localstorage:LocalstorageeService,private searchService :SearchService,private cartService:CartService){

    this.openCart = new EventEmitter<boolean>();
    this.lang = this.localstorage.getStatus();
    this.openCart = new EventEmitter<boolean>();
  }
  

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

  logout(){

    this.authService.logout().then(()=>{
      this.router.navigate(['login'])
    })
  }

  OpenCartFun()
  {
    this.isOpen = !this.isOpen;
    this.openCart.emit(this.isOpen);
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

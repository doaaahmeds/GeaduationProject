import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageeService } from 'src/app/services/localstoragee.service';
import { SearchService } from 'src/app/services/search/search.service';

import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  subCategoryofBags: IsubCategory[] | undefined = undefined;
  subCategoryofShose: IsubCategory[] | undefined = undefined;
  totalPrice = this.cartService.getTotalPrice();
  cartItems = 0;
  isOpen: boolean = false;

  @Output() openCart: EventEmitter<boolean>;

  lang: string = '';

 isUser : boolean = false;

 

  constructor(
    public authService: AuthenticationService,
    private getSubCatServ: ProductsAPIService,
    private router: Router,
    private translateservice: TranslateService,
    private localstorage: LocalstorageeService,
    private searchService: SearchService,
    public cartService: CartService
  ) {
    this.openCart = new EventEmitter<boolean>();
    this.lang = this.localstorage.getStatus();
  }

  isSearch: boolean = false;

  translatee(event: any) {
    this.translateservice.use(event.target.value);
    console.log(event.target.value);
  }

  ngOnInit(): void {
    this.localstorage.watchStorage().subscribe(() => {
      this.lang = this.localstorage.getStatus();
      console.log(this.lang + 'from header');
    });
    this.getSubCatServ
      .getAllsubCatOfBags()
      .subscribe((data: IsubCategory[]) => {
        this.subCategoryofBags = data;
        // console.log(data);
      });

      this.authService.user.subscribe(user=>{
        if(user){
          this.isUser = true
          this.authService.userId = user.uid
        }
        else this.isUser = false
      })

      let cartData = localStorage.getItem('products');
      if(cartData)
      {
        this.cartItems = JSON.parse(cartData).length;
      }


  this.cartService.cartData.subscribe((items:any) => {
    this.cartItems = items.length;
  })

    this.getSubCatServ
      .getAllsubCatOfshose()
      .subscribe((data: IsubCategory[]) => {
        this.subCategoryofShose = data;
      });
  }
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    });
  }

  OpenCartFun() {
    this.isOpen = !this.isOpen;
    this.openCart.emit(this.isOpen);
  }

  showSearch() {
    this.isSearch = !this.isSearch;
  }

  goToSearch(value: string) {
    this.searchService.setvalueOfSearch(value);

    // console.log(value);
    console.log(this.searchService.valueOfSearch);

    this.router.navigate(['/search']);
    this.isSearch = false;
  }
  toggleHeader(){
  this.isOpen = !this.isOpen
  }
}

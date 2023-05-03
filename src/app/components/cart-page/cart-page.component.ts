import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/models/icart';
import { Iproduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { LocalstorageeService } from 'src/app/services/localstoragee.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit
{
  isCloseCart:boolean = true;
  cartDetails:Icart[] | undefined = undefined;
  lang:string='';
  @Output() CloseCart:EventEmitter<boolean>;

  constructor(private router:Router,public cartService:CartService,private localstorage:LocalstorageeService){
    this.CloseCart = new EventEmitter<boolean>();
    this.lang=this.localstorage.getStatus();
    console.log(this.lang);
  }
  ngOnInit(): void {
    this.cartDetails = this.cartService.getProducts()
  }

  isOpen:boolean=false;
  setOrderSpecial()
  {
    this.isOpen =! this.isOpen;
  }

  deleteProduct(prod:any)
  {
    //console.log(prod)
    this.cartService.deleteProductById(prod);
    //console.log(this.cartService.deleteProductById(prod))
  }

  clearAllProducts()
  {
    this.cartService.clearAllProducts();
    this.router.navigate(['home'])
  }

  GoToCheckout()
  {
    this.CloseCart.emit(this.isOpen)
    this.router.navigate(['Checkout']);
  }
}

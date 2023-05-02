import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit
{
  isCloseCart:boolean = true;
  cartDetails:Iproduct[] | undefined = undefined;
  @Output() CloseCart:EventEmitter<boolean>;

  constructor(private router:Router,public cartService:CartService){
    this.CloseCart = new EventEmitter<boolean>();
  }
  ngOnInit(): void {
    this.cartDetails = this.cartService.getProducts()
  }

  isOpen:boolean=false;
  setOrderSpecial()
  {
    this.isOpen =! this.isOpen;
  }

  GoToCheckout()
  {
    this.CloseCart.emit(this.isOpen)
    this.router.navigate(['Checkout']);
  }
}

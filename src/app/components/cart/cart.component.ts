import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent
{
  products = this.cartService.getProducts();
  totalPrice = this.cartService.getTotalPrice();
  iCartDetail:Iproduct | undefined = undefined;
  isCloseCart:boolean = true;
  @Output() CloseCart:EventEmitter<boolean>;

  constructor(private router:Router, private cartService:CartService){
    this.CloseCart = new EventEmitter<boolean>();
  }

  isOpen:boolean=false;
  setOrderSpecial()
  {
    this.isOpen =! this.isOpen;
  }

  count:number=1
  increaseCount()
  {
    this.count ++;
  }

  decreaseCount()
  {
    this.count -- ;
  }

  CloseCartFun()
  {
    this.isOpen = false;
    this.CloseCart.emit(this.isOpen);
  }

  GoToCheckout()
  {
    this.CloseCart.emit(this.isOpen)
    this.router.navigate(['Checkout']);
  }
}

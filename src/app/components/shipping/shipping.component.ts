import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  products = this.cartService.getProducts();
  constructor(private router:Router,private cartService:CartService){}

  editEmail()
  {
    this.router.navigate(['Checkout']);
  }

  BackToCheckout()
  {
    this.router.navigate(['Checkout']);
  }
}

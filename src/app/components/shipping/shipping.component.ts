import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  constructor(private router:Router){}

  editEmail()
  {
    this.router.navigate(['Checkout']);
  }

  BackToCheckout()
  {
    this.router.navigate(['Checkout']);
  }
}

import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dejavu';
  receivedOpenCart:boolean = false;

  onOpenCart(isopenCart:boolean)
  {
    this.receivedOpenCart = isopenCart;
  }

  onCloseCart(isCloseCart:boolean)
  {
    this.receivedOpenCart = isCloseCart;
  }
}

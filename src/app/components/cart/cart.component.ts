import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/models/icart';
import { Iproduct } from 'src/app/models/iproduct';
import { IproductCart } from 'src/app/models/iproductcart';
import { CartService } from 'src/app/services/cart.service';
import { CartServService } from 'src/app/services/cart/cart-serv.service';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalPriceOfCart: number = 0;
  productQuantity = 0;
  iCartDetail: Icart[] | undefined = undefined;
  product_details: Iproduct | undefined = undefined;
  isCloseCart: boolean = true;
  @Output() CloseCart: EventEmitter<boolean>;

  constructor(private router: Router,
    public cartService: CartService,
    private prodAPIService: ProductsAPIService,
    private cartServ: CartServService,) {
    this.CloseCart = new EventEmitter<boolean>();
  }

  ngOnInit(): void {

    this.cartServ.getTotalPriceBS().subscribe((total) => {
      this.totalPriceOfCart = total;
    });
    this.cartServ.getDataObservable().subscribe(data => {
      this.iCartDetail = data;
    })

    this.iCartDetail = this.cartService.getProducts();
    this.iCartDetail?.map((prod) => {
      this.prodAPIService.getproductsbyid(prod.id).subscribe((data: Iproduct) => {
        console.log(data);

        this.product_details = data;
      })
    })
  }

  increaseProduct(index: number, id: string) {
    if (this.iCartDetail != undefined ) {
      console.log('creaseProduct cart.ts');

      this.cartServ.increaseOneProduct(this.iCartDetail[index])
    }
  }

  decreaseProduct(index: number, id: string) {
    if (this.iCartDetail != undefined) {
      console.log('decreaseProduct');

      this.cartServ.decreaseOneProduct(this.iCartDetail[index]);
    }
  }



  isOpen: boolean = false;
  setOrderSpecial() {
    this.isOpen = !this.isOpen;
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 10 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  CloseCartFun() {
    this.isOpen = false;
    this.CloseCart.emit(this.isOpen);
  }

  GoToCheckout() {
    this.CloseCart.emit(this.isOpen)
    this.router.navigate(['Checkout']);
  }
}

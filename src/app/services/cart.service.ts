import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iproduct } from '../models/iproduct';
import { Icart } from '../models/icart';

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  cartItemList : any = []
  productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts()
  {
    return this.productList.asObservable();
  }

  setProduct(product : any)
  {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice() : number
  {
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
}

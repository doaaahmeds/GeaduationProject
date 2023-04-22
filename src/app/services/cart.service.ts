import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  cartItemList:Iproduct[] = [];

  constructor() { }

  addtoCart(product : Iproduct){
    this.cartItemList.push(product);
  }

  getProducts()
  {
    return this.cartItemList;
  }

  getTotalPrice() : number
  {
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.new_price;
    })
    return grandTotal;
  }
}

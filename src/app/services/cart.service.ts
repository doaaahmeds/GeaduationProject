import { EventEmitter, Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { CookieService } from 'ngx-cookie-service';
import { Icart } from '../models/icart';

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  cartItemList:Iproduct[] = [];
  cartData = new EventEmitter<Iproduct[] | []>();

  constructor() { }

  addtoCart(product : Icart)
  {
    let cartData = [];
    let localCart = localStorage.getItem('products');
    if(!localCart)
    {
      localStorage.setItem('products',JSON.stringify([product]));
    }
    else
    {
      cartData = JSON.parse(localCart);
      // for loop
      cartData.push(product)
      localStorage.setItem('products',JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  getProducts()
  {
    let iCartDetail = [];
    let localCart = localStorage.getItem('products')
    if(localCart)
    {
      iCartDetail = JSON.parse(localCart)
    }
    return iCartDetail;
  }

  getTotalPrice() : number
  {
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.new_price;
    })
    return grandTotal;
  }

  deleteProductById(prodId:string)
  {
    localStorage.removeItem(prodId);
  }

  clearAllProducts()
  {
    localStorage.clear()
  }
}

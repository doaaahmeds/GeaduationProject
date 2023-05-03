import { EventEmitter, Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { CookieService } from 'ngx-cookie-service';
import { Icart } from '../models/icart';

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  iCartDetail = [];
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
    let localCart = localStorage.getItem('products')
    if(localCart)
    {
      this.iCartDetail = JSON.parse(localCart)
    }
    return this.iCartDetail;
  }

  getTotalPrice() : number
  {
    let grandTotal = 0;
    this.iCartDetail.map((a:any)=>{
      grandTotal += Number(a.totalPrice);
    })
    return grandTotal;
  }

  deleteProductById(prodId:string)
  {
    let index = this.iCartDetail.find((prod:any)=>{
      prod.id === prodId;
    })
    console.log(index)
    if(index)
    {
      if (index > -1) {
      this.iCartDetail.splice(index, 1);
      }
    }
  }

  clearAllProducts()
  {
    localStorage.clear()
  }
}

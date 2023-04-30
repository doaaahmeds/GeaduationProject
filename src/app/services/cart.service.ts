import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})

export class CartService
{
  cartItemList:Iproduct[] = [];

  constructor(private fireStore : AngularFirestore, private authService : AuthenticationService) { }

  // Making Add to Cart that records the id of user and products : 
  
  addtoCart(product : Iproduct){
     this.cartItemList.push(product);
    return this.fireStore.collection(`users/${this.authService.userId}/Cart`).add(product) 
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

import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { AngularFirestore , } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './authentication.service';
import { map, take } from 'rxjs';

import * as firebase from 'firebase/compat/app';
import { User } from '@angular/fire/auth';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  cartItemList:Iproduct[] = [];

  constructor(private firestore : AngularFirestore, private authService : AuthenticationService) { }

  // Making Add to Cart that records the id of user and products : 
  
  // addtoCart(product : Iproduct){
  //    this.cartItemList.push(product);
  //   return this.firestore.collection(`users/${this.authService.userId}/cart`).add(product) 
  // }
  addtoCart(id : string , name : string , imgs : string[] ,  new_price : number ){
  return  this.firestore.collection(`users/${this.authService.userId}/cart` ).add({
      prod_name  : name,
      imgs : imgs,
      price : new_price
     
    })
  }
  // addToCart(productId: string, userId: any) {
  //   // Check if product is already in cart for the user
  //   return this.getCart(userId).pipe(take(1)).toPromise().then((cart) => {
  //     const existingProductIndex = cart.findIndex((item: { productId: string; }) => item.productId === productId);
  //     if (existingProductIndex > -1) {
  //       // Increment quantity of existing product in cart
  //       cart[existingProductIndex].quantity += 1;
  //       return this.updateCart(userId, cart);
  //     } else {
  //       // Add new product to cart
  //       return this.firestore.collection('users').doc(userId).update(firebase.default.firestore.FieldValue.arrayUnion({productId , quantity : 1}))
          
          
  //     }
  //   });
  // }

  
  // getCart(userId: any  ) {
     
  //   return this.firestore
  //     .collection('users')
  //     .doc(userId)
  //     .get()
  //     .pipe(
  //       map((doc) => {
  //         const data = doc.data();
  //         return userId && userId.cart ? userId.cart : []
  //       })
  //     );
  // }

  // updateCart(userId: string, cart: any[]) {
  //   return this.firestore.collection('users').doc(userId).update({ cart });
  // }

  // removeProductFromCart(productId: string, userId: string) {
  //   return this.getCart(userId).pipe(take(1)).toPromise().then((cart) => {
  //     const existingProductIndex = cart.findIndex((item: { productId: string; }) => item.productId === productId);
  //     if (existingProductIndex > -1) {
  //       // Decrement quantity of existing product in cart
  //       if (cart[existingProductIndex].quantity > 1) {
  //         cart[existingProductIndex].quantity -= 1;
  //       } else {
  //         // Remove product from cart if quantity is 1
  //         cart.splice(existingProductIndex, 1);
  //       }
  //       return this.updateCart(userId, cart);
  //     } else {
  //       console.warn(`Product ${productId} not found in cart for user ${userId}`);
  //       return Promise.resolve();
  //     }
  //   });
  // }

  // clearCart(userId: string) {
  //   return this.firestore.collection('users').doc(userId).update({ cart: [] });
  // }

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

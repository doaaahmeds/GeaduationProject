import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { Icart } from 'src/app/models/icart';

@Injectable({
  providedIn: 'root'
})
export class CartServService {


  private storageBS: BehaviorSubject<Icart[]>;
  private totalPriceBS: BehaviorSubject<number>;
  private itemsOfCartBS: BehaviorSubject<number>;
  private ListProductsOfCart: Icart[]
  private productOfFind: Icart | undefined = undefined

  constructor() {

    this.ListProductsOfCart = this.getProductsFromLocalToIcart()

    this.storageBS = new BehaviorSubject<Icart[]>(this.getProductsFromLocalToIcart());

    this.totalPriceBS = new BehaviorSubject<number>(this.getTotalPrice());
    this.itemsOfCartBS = new BehaviorSubject<number>(this.getNumberItemOfCart());
  }



  private getProductsFromLocalToIcart(): Icart[] {

    let localCart = localStorage.getItem('products')
    if (localCart) {
      let itemsFromStorge = JSON.parse(localCart)
      let items: Icart[] = [];
      for (let i = 0; i < itemsFromStorge.length; i++) {

        let item: Icart = {
          id: itemsFromStorge[i].id,
          name: itemsFromStorge[i].name,
          size: itemsFromStorge[i].size,
          color: itemsFromStorge[i].color,
          color_ar: itemsFromStorge[i].color_ar,
          img: itemsFromStorge[i].img,
          quantity: itemsFromStorge[i].quantity,
          price: itemsFromStorge[i].price,
          totalPrice: itemsFromStorge[i].totalPrice ?? 1,
          name_ar: itemsFromStorge[i].name_ar,
        }
        items.push(item);

      }
      return items;

    } else {
      return []
    }
  }



  addProductToCart(product: Icart) {


    let localCart = localStorage.getItem('products');

    if (localCart) {


      this.ListProductsOfCart = this.getProductsFromLocalToIcart()
      let index = this.ListProductsOfCart.findIndex(item => item.id == product.id)

      if (index != -1) {

        if (this.ListProductsOfCart[index].quantity == product.quantity) {
          this.ListProductsOfCart[index].quantity++;
        } else if (product.quantity <=1 && this.ListProductsOfCart[index].quantity==1) {
          console.log('delet');

          this.ListProductsOfCart.splice(index, 1);
        } else if (this.ListProductsOfCart[index].quantity ==
          (product.quantity + 1)) {
          this.ListProductsOfCart[index].quantity--;
        }
        else {
          this.ListProductsOfCart[index].quantity = product.quantity
        }

        this.ListProductsOfCart[index].totalPrice = (this.ListProductsOfCart[index].quantity) * (this.ListProductsOfCart[index].price)
        console.log(this.ListProductsOfCart);
        console.log('if');

        localStorage.setItem('products', JSON.stringify([... this.ListProductsOfCart]));
        this.storageBS.next([... this.ListProductsOfCart])
      } else {
        console.log('else not exist in');
        console.log(this.ListProductsOfCart);
        localStorage.setItem('products', JSON.stringify([... this.ListProductsOfCart, product]));
        this.storageBS.next([... this.ListProductsOfCart, product])
      }




    } else {
      localStorage.setItem('products', JSON.stringify([product]));
      this.storageBS.next([product])
    }

    this.totalPriceBS.next(this.getTotalPrice());
    this.itemsOfCartBS.next(this.getNumberItemOfCart())

  }






  private getNumberItemOfCart(): number {
    let count = 0;
    let localCart = localStorage.getItem('products')
    if (localCart) {
      let items = JSON.parse(localCart);
      count = items.length;
    }
    return count;
  }


  private getTotalPrice(): number {
    let Total = 0;
    let localCart = localStorage.getItem('products')
    if (localCart) {
      let items = JSON.parse(localCart);
      items.map((a: any) => {
        Total += Number(a.totalPrice);
      })
    }
    return Total;
  }


  getDataObservable(): Observable<Icart[]> {
    return this.storageBS.asObservable();
    //we use it in cart
  }

  getTotalPriceBS(): Observable<number> {
    return this.totalPriceBS.asObservable();
    //we use it in heeader
  }

  getCountOfCartBS(): Observable<number> {
    return this.itemsOfCartBS.asObservable();
    //we use it in heeader
  }

  removeAllCartBS() {
    this.storageBS.next([])
    this.itemsOfCartBS.next(0)
    this.totalPriceBS.next(0)
    localStorage.removeItem('products');


  }




}

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

      let products: Icart[] = this.getProductsFromLocalToIcart()
      // console.log(products);
      this.productOfFind = products.find(item => item.id == product.id)

      if (this.productOfFind) {

        // this.productOfFind.quantity++;
        // console.log(products);


        // localStorage.setItem('products',
        //  JSON.stringify([...products, { }]));
        // this.storageBS.next([...products])



      } else {

        localStorage.setItem('products', JSON.stringify([...products, product]));
        this.storageBS.next([...products, product])

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

  removeAllCartBS(){
    this.storageBS.next([])
    this.itemsOfCartBS.next(0)
    this.totalPriceBS.next(0)
    localStorage.removeItem('products');
   

  }




}

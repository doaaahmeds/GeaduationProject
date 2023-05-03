import { EventEmitter, Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { CookieService } from 'ngx-cookie-service';
import { Icart } from '../models/icart';
import { ProductsAPIService } from './products-api.service';
import { ITransactionItem } from 'ngx-paypal';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  iCartDetail = [];

  cartItemList: Iproduct[] = [];
  totalPrice: number = 0;
  cartData = new EventEmitter<Iproduct[] | []>();

  //  private newItems:Subject <Icart[]>  ;
  //  private itemsOfITransactionItem = new Subject<ITransactionItem[]>();

  constructor(private prodAPIService: ProductsAPIService,
    private db: Firestore) {
    // this.newItems  = new BehaviorSubject<Icart[]>([])
  }



  addtoCart(product: Icart) {
    let cartData = [];
    let localCart = localStorage.getItem('products');
    if (!localCart) {
      localStorage.setItem('products', JSON.stringify([product]));
    }
    else {
      cartData = JSON.parse(localCart);
      // for loop
      cartData.push(product)
      localStorage.setItem('products', JSON.stringify(cartData));
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

  getTotalPrice(): number {
    let grandTotal = 0;
    this.iCartDetail.map((a:any)=>{
      grandTotal += Number(a.totalPrice);
    })
    return grandTotal;
  }





  // async  convertToIcart(): Promise<Observable<Icart[]>> {

  //   let newItems: Icart[] = [];
  //   let productsOfStorage: Icart[] = this.getProducts();

  //   productsOfStorage.map(item => {
  //     this.prodAPIService.getproductsbyid(item.id).subscribe(data => {

  //       newItems.push({
  //         id: item.id,
  //         color: item.color,
  //         color_ar: item.color_ar,
  //         size: item.size,
  //         quantity: item.quantity,
  //         img: item.img,
  //         name: item.name,
  //         price: data.new_price,
  //         totalPrice: (data.new_price * item.quantity),

  //       })
  //       this.newItems.next([...newItems])
  //       // console.log( this.newItems);
  //     });
  //   })

  //     // return of([...newItems]);
  //     return  this.newItems.asObservable()

  // }








  //  async  getITransactionItem(productsOfShipping: Icart[]): Promise<Observable<ITransactionItem[]>> {
  //   let items: ITransactionItem[] = [];
  //     productsOfShipping?.forEach((item) => {
  //      items.push({
  //       name: item.name,
  //       quantity: `${item.quantity}`,
  //       unit_amount: {
  //         currency_code: 'USD',
  //         value: `${item.price}`,
  //       },
  //     })

  //       this.itemsOfITransactionItem.next([...items]);
  //     })
  //     return this.itemsOfITransactionItem.asObservable();

  //   }






  getTotalPriceOfCart(cartItem: Icart[]): number {
    let total = 0;
    cartItem.map((prod: Icart) => {
      total += prod.totalPrice ?? 0;
    })
    return total;
  }



  convertToITransactionItem(productsOfStorage: Icart[]) {
    let items: ITransactionItem[] =

      [...productsOfStorage.map((item) => {
        return {
          name: item.name,
          quantity: `${item.quantity}`,
          unit_amount: {
            currency_code: 'USD',
            value: `${item.price}`,
          }
        }

      })]

    return items;
  }






  async addOrder(order: Icart) {
    let datetimeNow = new Date();
    const docRef = await addDoc(collection(this.db, "Orders"), {
      customer: "hassan",
      img: order.img,
      productName: order.name,
      paid:"Yes",
      count: order.quantity,
      price: order.price,
      balanceOrder: (Number(order.quantity) * Number(order.price)) + 5,
      date: datetimeNow.toUTCString(),
    });

  }
// async upadteProduct(product: Icart)  {

//         this.prodAPIService.getproductsbyid(product.id).subscribe(data => {

//           const docRef = doc(this.db, "product", product.id);
//           updateDoc(docRef,{
//     id:data.id,
//     catid: data.catid,
//     subid: data.subid,
//     name: data.name,
//     name_ar:data.name_ar,
//     details: data.details,
//     details_ar: data.details_ar,
//     size: ,
//     colors:,
//     colors_ar: ,
//     imgs: data.imgs,
//     offer: data.offer,
//     old_price: data.old_price,
//     new_price: data.new_price,
//     discount: data.discount,
// }

//           }).then(() => {
//               //  dispatch(ProductsList());
//               console.log(product);
//               console.log("Entire Document has been updated successfully.")
//           }).catch((error) => {
//               console.log(error);
//           })
//         })


//     }
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

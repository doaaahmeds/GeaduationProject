import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class SortProductsService {

  constructor() { }

  sortOfProducts(val:string ,products:Iproduct[]) :Iproduct[] {
    let productsAfterSort : Iproduct[] = [];
    if(val=='low') {
      productsAfterSort= products.sort((a :Iproduct,b:Iproduct) =>{
      return  b.new_price  - a.new_price})
    }
    if(val=='high') {
 
     productsAfterSort= products.sort((a :Iproduct,b:Iproduct) =>{
      return  a.new_price  - b.new_price}) 
    }
    if(val=='Z-A') {
 
       productsAfterSort= products.sort((a :Iproduct,b:Iproduct) =>{
      return  b.name.localeCompare(a.name) })
    }
    if(val=='A-Z') {
 
       productsAfterSort = products.sort((a :Iproduct,b:Iproduct) =>{
      return  a.name.localeCompare(b.name) })
   
    }
    return productsAfterSort ;

 }
}

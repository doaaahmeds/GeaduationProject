import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class SortProductsService {

 private productsSorted: Iproduct[] = [];
  constructor() { }

//   sortOfProduct(val:string ,products:Iproduct[]) :Iproduct[] {

//     if(val=='low') {
//      let products2= products.sort((a :Iproduct,b:Iproduct) =>{
//       return  b.new_price  - a.new_price})
//       return products2 
//     }
//     if(val=='high') {
 
//     let products2= products.sort((a :Iproduct,b:Iproduct) =>{
//       return  a.new_price  - b.new_price})
//       return products2 
//     }
//     if(val=='Z-A') {
 
//       let products2= products.sort((a :Iproduct,b:Iproduct) =>{
//       return  b.name.localeCompare(a.name) })
//       return products2 
//     }
//     if(val=='A-Z') {
 
//       let products2 = products.sort((a :Iproduct,b:Iproduct) =>{
//       return  a.name.localeCompare(b.name) })
//       return products2 
//     }


//  }
}

import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { Itest } from 'src/app/models/itest';
import { CartService } from 'src/app/services/cart.service';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { Observable, Subject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { LocalstorageeService } from 'src/app/services/localstoragee.service';
import { IproductCart } from 'src/app/models/iproductcart';
const Language_STORAGE_KEY = 'en';
@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit  {
isAdded : boolean = true
  product_details:Iproduct | undefined = undefined;
  product_added:Iproduct={
    id:'',
    catid: '',
    subid: '',
    name: '',
    name_ar:'',
    details: [''],
    details_ar: [''],
    size:new Map([
      ['', 20],
    ]),
    colors:new Map([
      ['', 20],
    ]),
    colors_ar:  new Map([
      ['', 20],
    ]),
    imgs: [''],
    offer: false,
    old_price: 220,
    new_price: 330,
    discount: 20,
  }
  apidata:Iproduct | undefined = undefined;
  cart:Iproduct[] = [];
  imges:string[]=[];
  lang:string='';
  cnt:number=-1;
  constructor(private prodAPIService:ProductsAPIService,private activatedRoutServ:ActivatedRoute,private localstorage:LocalstorageeService,private cartService:CartService){
    this.lang=this.localstorage.getStatus();
   
    }
  ngOnInit(): void {

    let productid:string;

      this.activatedRoutServ.paramMap.subscribe((paramMap=>{
        productid=(paramMap.get('id'))?String(this.activatedRoutServ.snapshot.paramMap.get('id')):'';

       if(productid!=undefined){
      
        this.prodAPIService.getproductsbyid(productid).subscribe(data=>{
          this.product_details=data;
          this.product_added.catid=this.product_details?.catid;
          this.product_added.id=this.product_details?.id;
          this.product_added.name=this.product_details?.name;
          this.apidata=data;
      
          
          //console.log(this.product_details);
          if(this.product_details.imgs[0])this.imges.push(this.product_details.imgs[0]);
          if(this.product_details.imgs[3])this.imges.push(this.product_details.imgs[3]);
          if(this.product_details.imgs[5])this.imges.push(this.product_details.imgs[5]);
          if(this.product_details.imgs[7])this.imges.push(this.product_details.imgs[7]);
          //console.log(this.imges);
        })
        }
       
        }))
        this.localstorage.watchStorage().subscribe(() => {
          this.lang = this.localstorage.getStatus();
          console.log(this.lang+'single');
        })
 


    }
  


  //   const itemSize = product.size.keys();
  //   // const itemCart:Icart = {
  //   //   id : product.id,
  //   //   name : product.name,
  //   //   size : itemSize.next().value,
  //   //   color :product.colors.keys().next().value,
  //   //   img:product.imgs[0],
  //   //   new_price:product.new_price,
  //   // }
  //   console.log(itemSize.next().value);

  //   this.cart.push(product);
  //   localStorage.setItem('cartItems',JSON.stringify(this.cart));
  // }

  selectedsize(event:any){
 
    console.log(event.target.innerText);
   
 
    if(this.product_added?.size!=undefined){

      this.product_added.size=event.target.innerText;
  }
    console.log(this.product_added);

  }
  selectedcolor(color:any,img:any){

   
    if(this.product_added?.colors!=undefined&&this.product_added?.imgs!=undefined){
      this.product_added.colors=color;
      this.product_added.imgs=img;
      
  }
    console.log(this.product_added);
    console.log(this.product_details);

  }

  addtocart(product:Iproduct)
  {
    this.cartService.addtoCart(product);
    if(this.isAdded){
      alert("Product Added")
    }
  }

}

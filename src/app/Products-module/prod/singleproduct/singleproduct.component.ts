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
import { Icart } from 'src/app/models/icart';
import { MapType } from '@angular/compiler';
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
    quantity:30,
    old_price: 220,
    new_price: 330,
    discount: 20,
  }
  apidata:Iproduct | undefined = undefined;
  ProductOfCart : Icart | undefined = undefined;
  productQuantity:number = 1;

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
          this.product_added.size=this.product_details.size;
          this.product_added.colors=this.product_details.colors;
          this.product_added.imgs[0]=this.product_details.imgs[0];
             
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
  


    handleQuantity(val:string)
    {
        if(this.productQuantity<10 && val==='plus')
        {
          this.productQuantity+=1;
        }
        else if(this.productQuantity>1 && val === 'min')
        {
          this.productQuantity-=1;
        }
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

      this.product_added.size=new Map([
        [event.target.innerText, 20],
      ]);
  }
    console.log(this.product_added);

  }
  selectedcolor(color:any,img:any){

   
    if(this.product_added?.colors!=undefined&&this.product_added?.imgs!=undefined){
      this.product_added.colors=new Map([
        [color, 20],
      ]);;
      this.product_added.imgs[0]=img;
      
  }
    console.log(this.product_added);
    console.log(this.product_details);

  }

  addtocart()
  {
      if(this.product_added)
      {
        this.ProductOfCart = {
          id : this.product_added.id,
          color : [ ...Object.keys(this.product_added.colors)][0],
          color_ar : [ ...Object.keys(this.product_added.colors_ar)][0],
          size : [ ...Object.keys(this.product_added.size)][0],
          quantity : this.productQuantity,
          img : this.product_added.imgs[0],
          name:this.product_added.name
        }
        this.cartService.addtoCart(this.ProductOfCart);
      }
  }

}

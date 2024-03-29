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

import { Icart } from 'src/app/models/icart';
import { CartServService } from 'src/app/services/cart/cart-serv.service';

const Language_STORAGE_KEY = 'en';
@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit  {
isAdded : boolean = true
selectedimg:string='';
selectsize:string='';
selectcolor:string='';
selectdiv:string='';
  product_details:Iproduct | undefined = undefined;
  product_added:Icart={
    id:'',
  size: '',
  color: '',
  color_ar: '',
  img:'',
  quantity:1,
  name:'',
  price:0,
  name_ar:''
  }
  apidata:Iproduct | undefined = undefined;
  ProductOfCart : Icart | undefined = undefined;
  productQuantity:number = 1;

  cart:Iproduct[] = [];
  imges:string[]=[];
  lang:string='';
  cnt:number=-1;

  constructor(
    private prodAPIService:ProductsAPIService,
    private activatedRoutServ:ActivatedRoute,
    private localstorage:LocalstorageeService,
    private cartService:CartService , 
    private cartServ :CartServService,
 
    ){
    this.lang=this.localstorage.getStatus();

    }
  ngOnInit(): void {

    let productid:string;

      this.activatedRoutServ.paramMap.subscribe((paramMap=>{
        productid=(paramMap.get('id'))?String(this.activatedRoutServ.snapshot.paramMap.get('id')):'';

       if(productid!=undefined){

        this.prodAPIService.getproductsbyid(productid).subscribe(data=>{
          this.product_details=data;

          this.product_added.id=data.id;
          this.product_added.price=data.new_price;
          this.product_added.name=data.name;
          this.product_added.img=data.imgs[0];
          this.product_added.size=[...Object.keys(data.size)][0];
          this.product_added.color=[...Object.keys(data.colors)][0];
          this.product_added.color_ar=[...Object.keys(data.colors_ar)][0];
          this.product_added.price=data.new_price;
          this.product_added.name_ar=data.name_ar;
          this.selectedimg=data.imgs[0];


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



  selectedsize(event:any){

    console.log(event.target.innerText);


    // if(this.product_added?.size!=undefined){

      this.product_added.size=event.target.innerText,
      this.selectsize=event.target.innerText;

  // }


  }
  selectedcolor(color:string,i:any){



 


    if(this.product_added?.color!=undefined&&this.product_added?.img!=undefined){
      this.product_added.color=color;

      this.product_added.img=this.imges[i];
      this.selectcolor=color;

  }


  }
  changeime(img:string){
    this.selectedimg=img;
    console.log(img);
  }

  addtocart()
  {
      if(this.product_added)
      {
        this.ProductOfCart = {
          id : this.product_added.id,
          color : this.product_added.color,
          color_ar : this.product_added.color_ar,
          size : this.product_added.size,
          quantity : this.productQuantity,
          img : this.product_added.img,
         name:this.product_added.name,
          price:this.product_added.price,
          totalPrice: (this.productQuantity * (this.product_added.price??1)),
          name_ar:this.product_added.name_ar
        }
        console.log(this.ProductOfCart);
        // this.cartService.addtoCart(this.ProductOfCart);
        this.cartServ.addProductToCart(this.ProductOfCart)
      }
  }
  showingimg(img:string){
    this.selectedimg=img;
    this.selectdiv=img;
    console.log(img);

  }

}

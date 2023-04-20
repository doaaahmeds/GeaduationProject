import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {

  product_details:Iproduct | undefined = undefined;
  imges:string[]=[];
  constructor(private prodAPIService:ProductsAPIService,private activatedRoutServ:ActivatedRoute,private cartService:CartService){}
  ngOnInit(): void {
  let productid:string;
    this.activatedRoutServ.paramMap.subscribe((paramMap=>{
      productid=(paramMap.get('id'))?String(this.activatedRoutServ.snapshot.paramMap.get('id')):'';

    if(productid!=undefined){
      this.prodAPIService.getproductsbyid(productid).subscribe(data=>{
        this.product_details=data;
        //console.log(this.product_details);
        if(this.product_details.imgs[0])this.imges.push(this.product_details.imgs[0]);
        if(this.product_details.imgs[3])this.imges.push(this.product_details.imgs[3]);
        if(this.product_details.imgs[5])this.imges.push(this.product_details.imgs[5]);
        if(this.product_details.imgs[7])this.imges.push(this.product_details.imgs[7]);
        //console.log(this.imges);
      })
      }
      }))
  }


  // addtocart(product:Iproduct)
  // {
  //   for (const key in product.size) {

  //     console.log(key);

  //     }


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

  addtocart(product:Iproduct)
  {
    this.cartService.addtoCart(product);
  }

}

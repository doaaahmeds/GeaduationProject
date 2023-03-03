import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
 
  product_details:Iproduct|undefined;
  constructor(private prodAPIService:ProductsAPIService,private router:Router, 
    private activatedRoutServ:ActivatedRoute ){

    }
  ngOnInit(): void {
  let productid:string;
    this.activatedRoutServ.paramMap.subscribe((paramMap=>{
      productid=(paramMap.get('id'))?String(this.activatedRoutServ.snapshot.paramMap.get('id')):'';
  
     if(productid!=undefined){
      this.prodAPIService.getproductsbyid(productid).subscribe(data=>{
        this.product_details=data;
       })
     }
     }))

  }
   



}

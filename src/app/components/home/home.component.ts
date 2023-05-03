import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { Itest } from 'src/app/models/itest';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import {TranslateService} from "@ngx-translate/core";
import { LocalstorageeService } from 'src/app/services/localstoragee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  links:string[]=['cgCpnqSfoejbeTYqAxQE','vBEYRuSj9Us4ZPPUbg13'];
  AllCat:Iproduct[]=[];
  lang:string='';
  selectomg:string='';
   constructor(private prodAPIService:ProductsAPIService,private router:Router /* ,private translateservice: TranslateService */,private localstorage:LocalstorageeService) {
    this.lang = this.localstorage.getStatus();
    
   }

   changeImage( elem :any , image:string){
    elem.src=image
  }
   
   
 /*  translateh(event:any){
    this.translateservice.use(event.target.value);

  } */
  ngOnInit(): void {
    this.localstorage.watchStorage().subscribe(() => {
      this.lang = this.localstorage.getStatus();
      console.log(this.lang+'from home');
    })
    this.prodAPIService.getAllProductes().subscribe(data=>{
      this.AllCat=data;
    
    
    })
  }

  checklang(){
   /*  var lang= localStorage.getItem("Language");
    if(lang=='ar'){

    }else{

    } */
  }
   AllCategory(){

   }
   changeime(img:string){
    
   }
}

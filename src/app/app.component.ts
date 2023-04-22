import { Component } from '@angular/core';

import {TranslateService} from "@ngx-translate/core";

import { CartService } from './services/cart.service';
import { LocalstorageeService } from './services/localstoragee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dejavu';
  lang:string='';
  
  constructor(private translateservice: TranslateService,private local:LocalstorageeService) {
    this.lang=this.local.getStatus();
  }
  
  translate(event:any){   
    if(event.target.value=='ar'||event.target.value=='en'){
      this.local.setStatus(event.target.value);
      this.lang= this.local.getStatus();
     this.translateservice.use(this.lang!);
    console.log(this.lang,'modeul');

    }
   
   
  }
  
  receivedOpenCart:boolean = false;

  onOpenCart(isopenCart:boolean)
  {
    this.receivedOpenCart = isopenCart;
  }

  onCloseCart(isCloseCart:boolean)
  {
    this.receivedOpenCart = isCloseCart;
  }
}

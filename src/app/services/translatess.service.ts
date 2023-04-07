import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
@Injectable({
  providedIn: 'root'
})
export class TranslatessService {

  constructor(private translateservice: TranslateService) {}
  translate(event:any){
    this.translateservice.use(event.target.value);

  }
}

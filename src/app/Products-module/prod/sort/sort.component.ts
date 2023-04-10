import { Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent     {
 
  // priceLow:boolean=false;
  // priceHigh:boolean=true;
  sort:string = "";


   @Output() sendsort: EventEmitter<any>



   constructor(private translate:TranslateService){
    this.sendsort = new EventEmitter<any>()

  
   }


   

   onSortChange(val:any):void {
  
    this.sendsort.emit(val.value)
   }
 



}
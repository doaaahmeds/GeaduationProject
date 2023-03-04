import { Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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



   constructor(){
    this.sendsort = new EventEmitter<any>()

  
   }


   

   onSortChange(val:any):void {
  
    this.sendsort.emit(val.value)
   }
 



}

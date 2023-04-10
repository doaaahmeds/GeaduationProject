import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent  implements OnChanges     {

  sort:string = "";
  @Input() catId :any = "";
 SubCategories :IsubCategory[]=[];
   @Output() sendsort: EventEmitter<any>;
   @Output() sendSortBySubCat: EventEmitter<any>;

   constructor(private prodAPIServ :ProductsAPIService ){
    this.sendsort = new EventEmitter<any>()
    this.sendSortBySubCat = new EventEmitter<any>()
  
   }

 

   onSortChange(val:any):void {
  
    this.sendsort.emit(val.value)
   }
   onSubCatChange(target :any):void {
    this.sendSortBySubCat.emit(target.value)
   }
 
 ngOnChanges(): void {
  // console.log(this.catId);
  this.prodAPIServ.getAllsubCatByCatId(this.catId).subscribe(data=>{
    this.SubCategories=[]
    if(data.length>1){
      this.SubCategories=data;

    }else if(this.catId=="nuWveyFOC62RoDdaFbqK") {

      this.prodAPIServ.getAllSubCat().subscribe(
      { next:  data=>{
        this.SubCategories=data;
        },
         error:err=>console.log(err), 
        })
    }
  

    
  })
  
  }


}

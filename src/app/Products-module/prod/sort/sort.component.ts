
import {  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageeService } from 'src/app/services/localstoragee.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent  implements OnChanges  {

 sort:string = "";
  @Input()  lang:string='';
  @Input() catId :any = "";
 SubCategories :IsubCategory[]=[];
   @Output() sendsort: EventEmitter<any>;
   @Output() sendSortBySubCat: EventEmitter<any>;



   constructor(
    private prodAPIServ :ProductsAPIService ,
    private translate:TranslateService,
    ){
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
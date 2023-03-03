import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproduct } from 'src/app/models/iproduct';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-secondlayout',
  templateUrl: './secondlayout.component.html',
  styleUrls: ['./secondlayout.component.scss']
})

export class SecondlayoutComponent implements OnInit   ,OnDestroy {
  products: Iproduct[] = [];
  infoSubCat:IsubCategory= {} as IsubCategory
  subscribes: Subscription[]=[];

  constructor(private prodAPIService: ProductsAPIService,private router: Router, 
              private activatedRoutServ: ActivatedRoute ) { }


  ngOnInit(): void {

  this.subscribes.push( this.activatedRoutServ.paramMap.subscribe((paramMap) => {

      let subCategoryId =paramMap.get('id')

      if (subCategoryId) {
        /*get Details Of Sub Category*/
        this.subscribes.push(this.prodAPIService.getDetailsOfSubCategory(subCategoryId).subscribe((details)=>{
          if (details.id==subCategoryId){
             this.infoSubCat=details;
            console.log(details);
          }
          else{ 

            this.router.navigate(['**'])}
          
          }))   

        /* get Productes Of Sub Category*/
        this.subscribes.push( this.prodAPIService.getProductesOfSub(subCategoryId).subscribe({
          
          next:(data: Iproduct[]) => {
            console.log(data); 
            if(data.length==0){
               this.router.navigate(['**'])
            }
             this.products = data
            
            } ,
          error:()=>this.router.navigate(['**'])
        }))
      }
    })) 

  }


  ngOnDestroy(): void {
   
    for(let subscribe of this.subscribes){
      subscribe.unsubscribe()
    }
  }

}

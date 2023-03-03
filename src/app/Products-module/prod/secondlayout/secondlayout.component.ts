import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-secondlayout',
  templateUrl: './secondlayout.component.html',
  styleUrls: ['./secondlayout.component.scss']
})

export class SecondlayoutComponent implements OnInit , OnDestroy {
  products: Iproduct[] = [];
  subscribes: Subscription[]=[];

  constructor(private prodAPIService: ProductsAPIService,private router: Router, 
              private activatedRoutServ: ActivatedRoute ) { }


  ngOnInit(): void {
  this.subscribes.push( this.activatedRoutServ.paramMap.subscribe((paramMap) => {

      let idOfSubcategory =paramMap.get('id');
      console.log(idOfSubcategory);

     
      
      if (idOfSubcategory) {
        console.log(idOfSubcategory);

        this.subscribes.push( this.prodAPIService.getProductesOfSub(idOfSubcategory).subscribe({
          
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

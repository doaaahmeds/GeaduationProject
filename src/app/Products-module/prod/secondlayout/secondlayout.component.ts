import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/icategory';
import { Iproduct } from 'src/app/models/iproduct';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-secondlayout',
  templateUrl: './secondlayout.component.html',
  styleUrls: ['./secondlayout.component.scss']
})

export class SecondlayoutComponent implements OnInit, OnDestroy {
  products: Iproduct[] = [];
  infoSubCat: IsubCategory = {} as IsubCategory
  infoCat: ICategory = {} as ICategory
  subscribes: Subscription[] = [];
  locationofurl:number=0;
  constructor(private prodAPIService: ProductsAPIService, private router: Router,
    private activatedRoutServ: ActivatedRoute) { }


  ngOnInit(): void {
    this.subscribes.push(this.activatedRoutServ.paramMap.subscribe((paramMap) => {
      let subCategoryId = paramMap.get('id')

      if (subCategoryId) {
        /*get Details Of  Category*/
        if (subCategoryId == 'cgCpnqSfoejbeTYqAxQE' || subCategoryId == 'vBEYRuSj9Us4ZPPUbg13') {
          console.log(subCategoryId);
          this.subscribes.push(this.prodAPIService.getDetailsOfcategory(subCategoryId).subscribe((details) => {
            if (details.id == subCategoryId) {
              this.infoCat = details;
              console.log(details);
            }
            else {
              this.router.navigate(['**'])
            }

          }))

          /* get Productes Of  Category*/
          this.subscribes.push(this.prodAPIService.getProductesOfcategory(subCategoryId).subscribe({
            next: (data: Iproduct[]) => {
            
              if (data.length == 0) {
                this.router.navigate(['**'])
              }
              this.locationofurl=1;

              this.products = data;

              console.log(this.products)
            },
            error: () => this.router.navigate(['**'])
          }))
        }



        else {
          
          console.log(subCategoryId);
          this.subscribes.push(this.prodAPIService.getDetailsOfSubCategory(subCategoryId).subscribe((details) => {
            if (details.id == subCategoryId) {
              this.infoSubCat = details;
              console.log(details);
            }
            else {
              this.router.navigate(['**'])
            }

          }))

          /* get Productes Of Sub Category*/
          this.locationofurl=2;
          this.subscribes.push(this.prodAPIService.getProductesOfSub(subCategoryId).subscribe({

            next: (data: Iproduct[]) => {
              console.log(data);
              if (data.length == 0) {
                this.router.navigate(['**'])
              }
              this.products = data
            },
            error: () => this.router.navigate(['**'])
          }))
        }

      }






    }))

  }


  ngOnDestroy(): void {

    for (let subscribe of this.subscribes) {
      subscribe.unsubscribe()
    }
  }

}

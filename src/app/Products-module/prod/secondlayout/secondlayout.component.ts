import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/icategory';
import { Iproduct } from 'src/app/models/iproduct';
import { IsubCategory } from 'src/app/models/isub-category';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { SortComponent } from '../sort/sort.component';
@Component({
  selector: 'app-secondlayout',
  templateUrl: './secondlayout.component.html',
  styleUrls: ['./secondlayout.component.scss']
})

export class SecondlayoutComponent implements OnInit, OnDestroy {
  products: Iproduct[] = [];
  Orginproducts: Iproduct[] = [];
  Filterdproducts: Iproduct[] = [];


  infoSubCat: IsubCategory | undefined = undefined;
  infoCat: ICategory | undefined = undefined
  subscribes: Subscription[] = [];
  locationofurl: number = 0;
  S_id?: string | null;

  constructor(private prodAPIService: ProductsAPIService, private router: Router,
    private activatedRoutServ: ActivatedRoute) { }


  ngOnInit(): void {


    this.subscribes.push(this.activatedRoutServ.paramMap.subscribe((paramMap) => {
      let ID: string | null = paramMap.get('id')
      this.S_id = ID;
      if (ID) {
        console.log(ID);

        /*get Details Of  Category*/

        if (ID == 'cgCpnqSfoejbeTYqAxQE' || ID == 'vBEYRuSj9Us4ZPPUbg13' || ID == 'nuWveyFOC62RoDdaFbqK') {
          // console.log(ID );
          this.subscribes.push(this.prodAPIService.getDetailsOfcategory(ID).subscribe((data) => {
            if (data.id == ID) {
              this.infoCat = data;
              console.log(data);
            }
            else {
              this.router.navigate(['**'])


            }

          }))

          /* get Productes Of  Offers*/

          if (ID == "nuWveyFOC62RoDdaFbqK") {
            this.subscribes.push(this.prodAPIService.getProductesOfOffers().subscribe({
              next: (data: Iproduct[]) => {

                if (data.length == 0) {
                  this.router.navigate(['**'])
                }
                this.locationofurl = 1;

                this.products = data;
                this.Orginproducts=data;

                console.log(this.products)
              },
              error: (err) => {
                console.log(err);
                this.router.navigate(['**'])
              }
            }))

          } else {
            /* get Productes Of  Category*/
            this.subscribes.push(this.prodAPIService.getProductesOfcategory(ID).subscribe({
              next: (data: Iproduct[]) => {

                if (data.length == 0) {
                  this.router.navigate(['**'])
                }
                this.locationofurl = 1;

                this.products = data;
                this.Orginproducts=data;

                // console.log(this.products)
              },
              error: () => this.router.navigate(['**'])
            }))
          }


        }



        else {

          // console.log(ID );
          this.subscribes.push(this.prodAPIService.getDetailsOfSubCategory(ID).subscribe((details) => {
            if (details.id == ID) {
              this.infoSubCat = details;
              // console.log(details);
            }
            else {
              this.router.navigate(['**'])
            }

          }))

          /* get Productes Of Sub Category*/
          this.locationofurl = 2;
          this.subscribes.push(this.prodAPIService.getProductesOfSub(ID).subscribe({

            next: (data: Iproduct[]) => {
              // console.log(data);
              if (data.length == 0) {
                this.router.navigate(['**'])
              }
              this.products = data;
              this.Orginproducts=data;
            },
            error: () => this.router.navigate(['**'])
          }))
        }

      }
    }))

  }

  onrecivedSort(val: string) {



    if (val == 'low') {
      this.products = this.products.sort((a: Iproduct, b: Iproduct) => {
        return b.new_price - a.new_price
      })
    }
    if (val == 'high') {

      this.products = this.products.sort((a: Iproduct, b: Iproduct) => {
        return a.new_price - b.new_price
      })
    }
    if (val == 'Z-A') {

      this.products = this.products.sort((a: Iproduct, b: Iproduct) => {
        return b.name.localeCompare(a.name)
      })
    }
    if (val == 'A-Z') {
      this.products = this.products.sort((a: Iproduct, b: Iproduct) => {
        return a.name.localeCompare(b.name)
      })
    }
    
    // OriginProduct take a copy of Products couse every time  i loop in products and it change every loop
   if (val == 'Black'||val=='Brown'||val=='Snack'||val=='Camel'||val=='Burgundy') {
    let imge='';
    this.products=this.Orginproducts;
    this.Filterdproducts=[];
    let flg=0;
    for(var prd of this.products){
       imge='';
      flg=0;
      for(var img of prd.imgs){
        if(img.includes(val)||img.includes(val.toUpperCase())||img.includes(val.toLowerCase())){
          imge=img;
          flg=1;
          break;
        }
      
      }
      if(flg==1) {
        prd.imgs[0]=imge; 
        this.Filterdproducts.push(prd);
        console.log(prd,imge); 
        }
    }
    this.products=this.Filterdproducts;
    console.log(this.Filterdproducts);
    console.log(this.products);
    }  



  }





  ngOnDestroy(): void {

    for (let subscribe of this.subscribes) {
      subscribe.unsubscribe()
    }
  }

}

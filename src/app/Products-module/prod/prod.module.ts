import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { SortComponent } from './sort/sort.component';
import { SecondlayoutComponent } from './secondlayout/secondlayout.component';
import {  RouterModule, Routes } from '@angular/router';
 import { EgyptPipe } from 'src/app/pipes/egypt.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { FormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

const routes :Routes=[
  
  {path: '', component:SecondlayoutComponent},
  

]

@NgModule({
  declarations: [
    ProductsComponent,
    SortComponent,
    SecondlayoutComponent,
   NavbarComponent,
   SingleproductComponent ,
   EgyptPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
     TranslateModule.forChild({
      defaultLanguage:'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory1,
          deps: [HttpClient]
      }
    }) 
  
  ]
})
export class ProdModule { } export function HttpLoaderFactory1(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
  
} 

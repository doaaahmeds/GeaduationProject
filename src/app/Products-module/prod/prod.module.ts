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
  ]
})
export class ProdModule { }

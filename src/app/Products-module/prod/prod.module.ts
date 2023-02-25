import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { SortComponent } from './sort/sort.component';
import { SecondlayoutComponent } from './secondlayout/secondlayout.component';
import {  RouterModule, Routes } from '@angular/router';

const routes :Routes=[
  
  {path: '', component:SecondlayoutComponent},

]

@NgModule({
  declarations: [
    ProductsComponent,
    SortComponent,
    SecondlayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProdModule { }

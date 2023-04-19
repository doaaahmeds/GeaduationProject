import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SingleproductComponent } from './Products-module/prod/singleproduct/singleproduct.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { SearchComponent } from './Products-module/prod/search/search.component';

const routes: Routes = [

  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home', component: HomeComponent },
  {path:'single/:id',component:SingleproductComponent},
  {
    path:  'products/:id',
    loadChildren: () => import('src/app/Products-module/prod/prod.module').then(m => m.ProdModule)
  },
  {path:'Checkout',component:CheckoutComponent},
  {path:'Shipping',component:ShippingComponent},
  {path:'search',component:SearchComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SingleproductComponent } from './Products-module/prod/singleproduct/singleproduct.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { SearchComponent } from './Products-module/prod/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgxPayPalModule } from 'ngx-paypal';

import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { CartPageComponent } from './components/cart-page/cart-page.component';


const routes: Routes = [

  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home', component: HomeComponent },
  {path:'single/:id',component:SingleproductComponent},
  {
    path:  'products/:id',
    loadChildren: () => import('src/app/Products-module/prod/prod.module').then(m => m.ProdModule)
  },
  {path:'Cart',component:CartPageComponent},
  {path:'Checkout',component:CheckoutComponent},
  {path:'Shipping',component:ShippingComponent},
  {path:'search',component:SearchComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignUpComponent},
  {path:'verify', component:VerifyComponent},
  {path:'forgotpass', component:ForgotPasswordComponent},
  {path:'user', component:UserProfileComponent},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,],

})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FilterPipe } from './pipes/filter.pipe';
import { EGPipe } from './pipes/eg.pipe';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AngularFirestoreModule} from'@angular/fire/compat/firestore'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { NgxPayPalModule } from 'ngx-paypal';
import { CartPageComponent } from './components/cart-page/cart-page.component';





@NgModule({
  declarations: [
    AppComponent,
 HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    FilterPipe,
    EGPipe,

   // EgyptPipe
    CartComponent,
    CheckoutComponent,
    ShippingComponent,
    SignUpComponent,
    LoginComponent,
    CartPageComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireStorageModule,
    NgxPayPalModule,
    TranslateModule.forRoot({
     
      defaultLanguage:`${localStorage
        .getItem('Language')
        ?.replaceAll('"', '')}`,
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),


  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}





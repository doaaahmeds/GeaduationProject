import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icart } from 'src/app/models/icart';
import { Iproduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CartServService } from 'src/app/services/cart/cart-serv.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit
{
  userForm: FormGroup;
  totalPriceOfCart:number=0;
  productsOfCheckout : Icart[] | undefined = undefined;

  constructor(private formBuilder:FormBuilder,private router:Router,public cartService:CartService,
    private cartServ :CartServService,
    ){
    this.userForm = this.formBuilder.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',Validators.required],
      address: ['',[Validators.required]],
      city: ['',[Validators.required]],
      phone: ['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.productsOfCheckout = this.cartService.getProducts();
    this.cartServ.getTotalPriceBS().subscribe((total)=>{
      this.totalPriceOfCart=total;
       });
       this.cartServ.getDataObservable().subscribe(data => {
        this.productsOfCheckout=data;
      })
  }

  // convert to property
  get firstName(){
    return this.userForm.get('firstName');
  }

  get lastName(){
    return this.userForm.get('lastName');
  }

  get email(){
    return this.userForm.get('email');
  }

  get address(){
    return this.userForm.get('address');
  }

  get city(){
    return this.userForm.get('city');
  }

  get phone(){
    return this.userForm.get('phone');
  }

  GoToCart()
    {
      this.router.navigate(['Cart'])
    }


    GoToShipping()
    {
      this.router.navigate(['Shipping']);
    }
}

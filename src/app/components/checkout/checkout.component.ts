import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  products = this.cartService.getProducts();
  userForm: FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router,private cartService:CartService){
    this.userForm = this.formBuilder.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',Validators.required],
      address: ['',[Validators.required]],
      city: ['',[Validators.required]],
      phone: ['',[Validators.required]]
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


    GoToShipping()
    {
      this.router.navigate(['Shipping']);
    }
}

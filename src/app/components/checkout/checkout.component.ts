import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icart } from 'src/app/models/icart';
import { Iproduct } from 'src/app/models/iproduct';
import { User } from 'src/app/models/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { doc, updateDoc } from "firebase/firestore";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit
{
  userForm: FormGroup;
  user:User={};
  productsOfCheckout : Icart[] | undefined = undefined;
  constructor(private formBuilder:FormBuilder,private router:Router,public cartService:CartService,private authserv:AuthenticationService){
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


    GoToShipping(address1:string,city1:string)
    {
      let id=localStorage.getItem('userid')!;
      console.log(id);
   /*    if(id!=null){
        this.authserv.getuserbyid(id).subscribe(data=>{
          this.user=data;
          console.log(data);
         
          if(city1&&address1){
             this.user.city=city1;
             this.user.address=address1;
          }
          this.authserv.updateuser(id,this.user).then(data=>{
            console.log(data);
          }).catch(err=>{
            console.log(err);
          })
      
        
          console.log(this.user+'users');
          console.log(city1,address1);
          
        })
      
        
      } */
     
      this.router.navigate(['Shipping']);
    }
}

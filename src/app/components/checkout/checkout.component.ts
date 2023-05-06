import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icart } from 'src/app/models/icart';
import { Iproduct } from 'src/app/models/iproduct';
import { User } from 'src/app/models/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { CartServService } from 'src/app/services/cart/cart-serv.service';
import { doc, updateDoc } from "firebase/firestore";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  userForm: FormGroup;
  totalPriceOfCart: number = 0;
  productsOfCheckout: Icart[] | undefined = undefined;
  AllUser: User[] = [];

  user: User = {} as User;

  constructor(private formBuilder: FormBuilder, private router: Router, public cartService: CartService,
    private cartServ: CartServService, private authserv: AuthenticationService
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', Validators.required],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
    this.authserv.getAllUsers().subscribe(data => {
      this.AllUser = data;
    })

  }
  ngOnInit(): void {
    // this.productsOfCheckout = this.cartService.getProducts();
    this.cartServ.getTotalPriceBS().subscribe((total) => {
      this.totalPriceOfCart = total;
    });
    this.cartServ.getDataObservable().subscribe(data => {
      this.productsOfCheckout = data;
    })
  }

  addOrder(product: Icart) {
    this.cartService.addOrder(product).then((result) => console.log(result)).catch((err) => console.log(err));
    

  }
  // convert to property
  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get address() {
    return this.userForm.get('address');
  }

  get city() {
    return this.userForm.get('city');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  GoToCart() {
    this.router.navigate(['Cart'])
  }


  GoToShipping(address1: string, city1: string) {
    let id = localStorage.getItem('userid')!;
    console.log(id);
    let x = 0;
    if (id != null) {
      this.user = this.AllUser.find(item => item.id == id)!;

      /*    this.authserv.getuserbyid(id).subscribe(data=>{
          this.user=data;
          x=1;
          console.log(data);
        })  */

      if (city1 && address1) {
        this.user.city = city1;
        this.user.address = address1;
      }
      console.log(this.user + 'users');
      console.log(city1, address1);
      console.log(this.user.email);
    }
    if (id != null) {
      this.authserv.updateuser(id, this.user).then(data => {
        console.log(data);
      }).catch(err => {
        console.log(err);
      })

    }

    this.router.navigate(['Shipping']);
  }
}

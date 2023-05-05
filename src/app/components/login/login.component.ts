import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Routes, Router } from '@angular/router';
import { User } from '../../models/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as firebase from 'firebase/auth'
import { ToasterService } from 'src/app/services/toaster.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
passwordResetEmail : string = ''
isUser : boolean = false
userEmail : string = ''
allUsers : User[] = []
searchUser : boolean = false
// code : string =''
   loginFormValid :boolean = false
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email , Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    password: new FormControl('', [Validators.required ,Validators.pattern(
      /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
    )]),
  });
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private toast : ToasterService,
   
  ) {
 this.authService.getAllUsers().subscribe((data)=>{
  this.allUsers = data
 })
   }
  ngOnInit(): void {
    
  console.log('login');
  }




  

  //Sign in
  get email() {
    
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  submit(email1 : string) {
    this.searchUser = false
    if (!this.loginForm.valid ) {
      this.toast.showToasterFail("Please enter correct data !!")
    }
    for(let i of this.allUsers){
      if(i.email == email1){
        this.searchUser = true
        break;
      }
    }
    if(!this.searchUser){
      this.toast.showToasterFail("You are not a member , Please Register") 
    }

//     this.authService.user.subscribe(user=>{
//       if(email1 == user){
//  this.toast.showToasterFail("You are not a member , Please Register")
//       }

    // }) 
    const { email , password } = this.loginForm.value;
    this.authService.login(email, password).then((res) => { 
      this.router.navigate(['/home']);
    });
  }
  
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/login'])
    }).catch((error) => {
      console.log(error);
    });
  }
 
}

//     this.authService.user.subscribe(user=>{
//       if(!user){
//  this.toast.showToasterFail("You are not a member , Please Register")
//       }
    
//     }) 

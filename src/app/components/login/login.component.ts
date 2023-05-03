import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Routes, Router } from '@angular/router';
import { user } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as firebase from 'firebase/auth'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
passwordResetEmail : string = ''

// code : string =''
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    
  ) { }
  ngOnInit(): void {}
  



  

  //Sign in
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  submit() {
    if (!this.loginForm.valid ) {
      alert("Please fill correct data !!");
    }
    const { email , password } = this.loginForm.value;
    this.authService.login(email, password).then((res) => { 
      localStorage.setItem("userConnect" , res.user.uid)
      this.router.navigate(['/home']);
    });
  }
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/login'])
    })
  }

  
  forgotPassword(){   
    this.authService.forgotPassword( this.passwordResetEmail)
    this.passwordResetEmail = ''
  }
}

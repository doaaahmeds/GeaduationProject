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
   loginFormValid :boolean = false
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    
  ) { }
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
  submit() {
    if (!this.loginForm.valid ) {
      this.loginFormValid=true
    }
    const { email , password } = this.loginForm.value;
    this.authService.login(email, password).then((res) => { 
      this.router.navigate(['/home']);
    });
  }
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/login'])
    })
  }
 
}

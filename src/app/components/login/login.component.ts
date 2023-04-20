import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    
  ) { }
  ngOnInit(): void { }
  



  

  //Sign in
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const { email , password } = this.loginForm.value;
    this.authService.login(email, password).then(() => {
      this.router.navigate(['/home']);
    });
  }
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/login'])
    })
  }
}

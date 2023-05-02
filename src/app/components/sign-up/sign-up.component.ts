import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService : AuthenticationService , private router  : Router, private userService : UserService ){}
  ngOnInit(): void{} 
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }
  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }
  submit(){
    if(this.signUpForm.valid){
      this.router.navigate(['/home']);
      
    }
    const {firstname , lastname , email , password}= this.signUpForm.value
    this.authService.signUp(firstname,lastname,email,password)
  }

  // Making signup method with properties to add it to users collection :
  signUp(signUpForm:any){
    let data : User = signUpForm.value
    this.authService.signUp(data.firstname , data.lastname , data.email , data.password).subscribe((res)=>{
      this.userService.addNewUser(res.user.uid , data.firstname! , data.lastname! , data.email!)

      if(this.signUpForm.valid){
        alert("Registeration Successful")
        this.router.navigate(['/home'])
      }
      else{
        alert("Please fill the correct data")
      }
    })
  }
}

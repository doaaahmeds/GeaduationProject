import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
cart : string[] = []
SignUpValid :boolean = false
isUser : boolean = false
  signUpForm = new FormGroup({
    firstname: new FormControl('',[Validators.required ]),
    lastname: new FormControl('',[Validators.required ]),
    email: new FormControl('', [Validators.required, Validators.email , Validators.pattern("^[a-z0-9._%+-]+@+[a-z0-9.-]+.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required , Validators.pattern(
      /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
    ) , Validators.minLength(7)]),
    
  });

  constructor(private authService : AuthenticationService , private router  : Router, private userService : UserService , private toaster : ToasterService){}
  ngOnInit(): void{
    console.log("signUpForm");
    
  } 
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
  // submit(){
  //   if(this.signUpForm.valid){
 
  //     this.router.navigate(['/home']);
      
  //   }
  //   // const {firstname , lastname , email , password  }= this.signUpForm.value
  //   // this.authService.signUp(firstname,lastname,email,password,cart)
  // }

  // Making signup method with properties to add it to users collection :

  showMessage(){
    this.toaster.showToaster("Registeration success")
  }

  signUp(signUpForm:any){
    let data : User = signUpForm.value
    this.authService.signUp(data.firstname , data.lastname , data.email , data.password ).subscribe((res)=>{
      this.userService.addNewUser(res.user.uid , data.firstname! , data.lastname! , data.email! )
   
    })
    if(this.signUpForm.invalid){
      this.toaster.showToasterFail("Please fill correct data !")
    
      
    }else{
      this.toaster.showToaster("Registeration success")
      this.router.navigate(['/home'])
    }
  }

}

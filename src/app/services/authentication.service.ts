import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Observable, from, switchMap } from 'rxjs';
import * as firebase from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //making userID to get Connected with ID in users collection :
userId : string = ''
user : Observable<firebase.User | any>


  currentuser$ = authState(this.auth)
  constructor(private auth : Auth , private afAuth : AngularFireAuth , private router : Router) {
    this.user = afAuth.user
   }
  
  login(username : any , password: any){
   
    return (signInWithEmailAndPassword(this.auth, username , password));
    
  }
  signUp(firstname:any , lastname:any , email : any , password:any , cart :any ){
  
  return from (createUserWithEmailAndPassword(this.auth , email ,password))
  
   
  }
  GoogleAuth() {
    return this.AuthGoogleLogin(new GoogleAuthProvider());
  }

  AuthGoogleLogin(provider : any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        alert('You have been successfully logged in!');
        this.router.navigate(['/home'])
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }
  FacebookAuth(){
    return this.AuthFacebookLogin(new FacebookAuthProvider())
  }
  AuthFacebookLogin(provider : any){
   return this.afAuth.signInWithPopup(provider).then((result)=>{
      alert('You have been successfully logged in!');
        this.router.navigate(['/home'])
    })
    .catch((error) => {
      alert("Something went wrong");
    });
  }

  logout(){
    return (this.auth.signOut())
  }
  forgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.router.navigate(['/verify']);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while sending the password reset email.");
      });
  }
  sendEmailForVerify(user : any){
    user.sendEmailVerify().then((res : any)=>{
      this.router.navigate(['/verify'])
    })
  }
}

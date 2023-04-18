import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentuser$ = authState(this.auth)
  constructor(private auth : Auth) { }
  login(username : any , password: any){
    return (signInWithEmailAndPassword(this.auth, username , password));
  }
  signUp(firstname:any , lastname:any , email : any , password:any){
   return from(createUserWithEmailAndPassword(this.auth, email , password)).pipe
   switchMap(({user})=> updateProfile(user,{displayName:firstname+""+lastname}))
  }
  logout(){
    return (this.auth.signOut())
  }
}

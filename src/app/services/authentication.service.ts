import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Observable, from, switchMap } from 'rxjs';
import * as firebase from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //making userID to get Connected with ID in users collection :
userId : string = ''
user : Observable<firebase.User | any>


  currentuser$ = authState(this.auth)
  constructor(private auth : Auth , private afAuth : AngularFireAuth) {
    this.user = afAuth.user
   }
  
  login(username : any , password: any){
    return (signInWithEmailAndPassword(this.auth, username , password));
  }
  signUp(firstname:any , lastname:any , email : any , password:any){
  return from (createUserWithEmailAndPassword(this.auth , email ,password))
  }
  logout(){
    return (this.auth.signOut())
  }
}

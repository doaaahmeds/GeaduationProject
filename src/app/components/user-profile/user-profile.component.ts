import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/iuser';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
 Uid: any
  dataProfile  : any={
    firstname : '',
    lastname : '',
    email : '',
    
  }
  constructor(private authService : AuthenticationService , private router : Router , private fireStore : AngularFirestore) {

    this.authService.user.subscribe((user)=>{
      this.Uid= user.uid
    })
  }
ngOnInit(){
 this.fireStore.collection(`users`).valueChanges().subscribe((data : any)=>{
  this.dataProfile = data.map((prop : any)=>{
    console.log(data);
    
    return {
      
      firstname : data['firstname'],
      lastname : data['lastname'],
    }
  })
 })
// let ebs : any = localStorage
// this.fireStore.collection("users").ref.doc(ebs.getItem("userConnect")).get().then((data : any)=>{
// this.dataProfile.firstname = data()['firstname']
// this.dataProfile.lastname= data()['lastname']
// this.dataProfile.email = data()['email']
// this.dataProfile.id  = localStorage.getItem('userConnect')
// })
}
Logout(){
  this.authService.logout().then(()=>{
    this.router.navigate(['/login'])
  })
}
}
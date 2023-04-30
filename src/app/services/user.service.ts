import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private fireStore : AngularFirestore) { }

  //adding new user with ID in collection users :

  addNewUser(id : string , firstname : string , lastname : string , email : string ){
    this.fireStore.doc('users/' +id).set({
      firstname : firstname,
      lastname : lastname,
      id: id
    })
  }
}

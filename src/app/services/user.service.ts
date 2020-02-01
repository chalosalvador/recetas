import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  constructor( public afDB: AngularFirestore ) {
  }

  createUser (id, email) {
    return this.afDB.collection('users').doc(id).set({
      email
    });
  }

  getUser(id) {
    return this.afDB.collection('users').doc(id); // esto se resuelve en una promesa con un objeto con los datos del usuario de la bdd
  }

  
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  
  
  constructor( public afAuth: AngularFireAuth,public afDB: AngularFirestore ) {
  }
//CREACION DE USUARIOS EN BDD
  createUser(value){
    return new Promise<any>((resolve, reject) => {
      
      let currentUser = firebase.auth().currentUser;
      //const uid='lUHYHyAerjgX7n6rXRBLh6UCZacp2';
      console.log(currentUser)
      this.afDB.collection('users').doc(currentUser.uid).set({
        name: value.name,
        lastname: value.lastname,
        nickname: value.nickname,
        dateBirth:value.dateBirth,
        height:value.height,
        weight:value.weight,
        gender:value.gender
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  //OBTENER USUARIO DESDE LA BDD

  
  /*async getUser(id){
    try {
      const result= await this.afDB.collection('users').doc(id).ref.get();
      if(result.exists){
        return result.data();
      }else{
        throw new Error ('Data not found with given id');
      }
    } catch (error) {
      throw new Error(error);
      
    }
    
    
  }*/
  
  getUser (id) { 
    return this.afDB.collection ("users").doc(id).get ();
  }
  
  /*getUser(id){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afDB.doc<any>('users/' + currentUser.uid + name ).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }
      })
    });
  }*/

  //AGREGAR INFORMACION AL PERFIL DEL USUARIO
  AddData(problem){
    return new Promise<any>((resolve, reject) => {
      
      let currentUser = firebase.auth().currentUser;
      console.log(currentUser.uid)
      
      this.afDB.collection('users').doc(currentUser.uid).update({'health-info': problem})
        
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }


}

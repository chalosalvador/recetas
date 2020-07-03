import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(public afAuth: AngularFireAuth, public afDB: AngularFirestore) {
  }
  //CREACION DE USUARIOS EN BDD
  createUser(value) {
    return new Promise<any>((resolve, reject) => {

      let currentUser = firebase.auth().currentUser;
      //const uid='fcVBgyxl4OgMNGMwhZ4DQY6eE0';
      console.log(currentUser)
      this.afDB.collection('users').doc(currentUser.uid).set({
        name: value.name,
        lastname: value.lastname,
        nickname: value.nickname,
        dateBirth: value.dateBirth,
        height: value.height,
        weight: value.weight,
        gender: value.gender
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }
  //OBTENER USUARIO DESDE LA BDD

  getUser(id) {
    return this.afDB.collection("users").doc(id).get();
  }
  getUserDetail(id) {
    return this.afDB.collection("users").doc(id).valueChanges();
  }

  //AGREGAR INFORMACION AL PERFIL DEL USUARIO
  addData(problem) {
    return new Promise<any>((resolve, reject) => {

      let currentUser = firebase.auth().currentUser;
      console.log(currentUser.uid)

      this.afDB.collection('users').doc(currentUser.uid).update({ 'health-info': problem })

        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }
  //AÑADE EL PLAN DE COMIDAS A CADA USER 
  createPlan(plan) {

    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      //const uid='QvKCjj2UIrh9hb8WhQPLOgAeZ9e2';
      this.afDB.collection('users').doc(currentUser.uid).collection('plan').add({
        date: plan
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }
  //OBTIENE EL PLAN PARA MOSTRAR 
  getPlan() {
    let currentUser = firebase.auth().currentUser;
    //const uid='QvKCjj2UIrh9hb8WhQPLOgAeZ9e2';
    return this.afDB.collection("users").doc(currentUser.uid).collection('plan').valueChanges();
  }

}

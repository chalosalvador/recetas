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
  // CREACION DE USUARIOS EN BDD
  createUser(value) {
    return new Promise<any>((resolve, reject) => {

      let currentUser = firebase.auth().currentUser;
      //const uid='QvKCjj2UIrh9hb8WhQPLOgAeZ9e2';
      console.log(currentUser)
      this.afDB.collection('users').doc(currentUser.uid).set({
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: value.name,
        lastname: value.lastname,
        nickname: value.nickname,
        dateBirth: value.dateBirth,
        height: value.height,
        weight: value.weight,
        image: 'https://image.flaticon.com/icons/png/512/149/149071.png',
        gender: value.gender,
        dailyActivities: value.dailyActivities
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  //OBTIENE LOS DETALLES DEL USUARIO REGISTRADO
  getUserDetail() {
    let currentUser = firebase.auth().currentUser;
    //const uid='Q7p2NBZT6NYLjbVwY89SwcPvvN13';
    //return this.afDB.collection("users").doc(uid).valueChanges();
    return this.afDB.collection("users").doc(currentUser.uid).valueChanges();
  }

  //REGISTRAR TOKEN DEL DISPOSITIVO
  public async registerToken(token, uid) {
    return await this.afDB.collection('devices').doc(token).set({
      token,
      uid
    });
  }

  //AGREGAR INFORMACION AL PERFIL DEL USUARIO
  addData(problem) {
    return new Promise<any>((resolve, reject) => {

      let currentUser = firebase.auth().currentUser;
      console.log(currentUser.uid)

      this.afDB.collection('users').doc(currentUser.uid).update({ 'healthInfo': problem })

        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }
  
  //ACTUALIZAR DATOS DEL USUARIO
  updateUser(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      //const uid='RzIwJ12ogtgTBRqlaNQodXep5T02';
      this.afDB.collection('users').doc(currentUser.uid).set(value)
        //this.afDB.collection('users').doc(uid).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }

  //AÑADE EL PLAN DE COMIDAS A CADA USER
  createPlan(plan) {

    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      //const uid='Q7p2NBZT6NYLjbVwY89SwcPvvN13';
      //this.afDB.collection('users').doc(uid).collection('plan').add(
      this.afDB.collection('users').doc(currentUser.uid).collection('plan').add(
        plan
      )
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  //OBTIENE EL PLAN PARA MOSTRAR
  getPlan() {
    let currentUser = firebase.auth().currentUser;
    //const uid='Q7p2NBZT6NYLjbVwY89SwcPvvN13';
    //return this.afDB.collection("users").doc(uid).collection('plan').snapshotChanges();
    return this.afDB.collection("users").doc(currentUser.uid).collection('plan').snapshotChanges();
  }

  //ACTUALIZAR EL PLAN SELECCIONADO
  updatePlan(id, event) {
    let currentUser = firebase.auth().currentUser;
    //const uid='Q7p2NBZT6NYLjbVwY89SwcPvvN13';
    //return this.afDB.collection("users").doc(uid).collection('plan').doc(id).update(event);
    return this.afDB.collection("users").doc(currentUser.uid).collection('plan').doc(id).update(event);

  }

  //ELIMIANR EL PLAN SELECCIONADO
  deletePlan(planKey) {
    let currentUser = firebase.auth().currentUser;
    //const uid='Q7p2NBZT6NYLjbVwY89SwcPvvN13';
    //return this.afDB.collection("users").doc(uid).collection('plan').doc(planKey).delete();
    return this.afDB.collection("users").doc(currentUser.uid).collection('plan').doc(planKey).delete();

  }

}

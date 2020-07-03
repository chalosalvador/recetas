import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  next: any;
  data: any;
  constructor(public afAuth: AngularFireAuth, public afDB: AngularFirestore) {
  }
  // HACE LA CONSULTA LA BASE DE DATOS A LA COLECCION RECETAS 
  getRecipesList() {

    return this.afDB.collection('recipes').snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          console.log('==', {
            id: doc.payload.doc.id,
            data: doc.payload.doc.data()
          });
          return {
            id: doc.payload.doc.id,
            data: doc.payload.doc.data()

          }
        })
      })
    )

  }
  //OBTENER DATOS DESDE FIREBASE SEGUN EL ID 
  // getRecipes(id) {
  //   return this.afDB.collection("recipes").doc(id).ref.get();
  // }

  //OBTIENE LOS DATOS DE UNA PAGINA LOS GUARDA PARA ENVIARLOS A OTRA
  sendData(data) {
    this.next = data;
  }
  //RECUPERA LOS DATOS GUARDADOS EN SETEXTRAS
  getData() {
    return this.next;
  }
  //OBTIENE LA LISTA DE RECETAS SEGUN SU TIPO
  getListRecipes(category) {

    return this.afDB.collection('recipes', ref => ref.where('category', '==', category)).valueChanges();
    //OBTIENE LOS DATOS DE COLECCION UNIDADES DESDE FIREBASE
  }
  getUnits() {
    return this.afDB.collection("units").snapshotChanges();
  }
  getIngredients() {
    return this.afDB.collection("ingredients").snapshotChanges();
  }








}
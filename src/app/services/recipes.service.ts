import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class RecipesService {

  private snapshotChangesSubscription: any;
  
  constructor( public afAuth: AngularFireAuth,public afDB: AngularFirestore ) {
  }
// HACE LA CONSULTA LA BASE DE DATOS A LA COLECCION RECETAS 
  getRecipesList(){
     //return this.afDB.collection('recipes').valueChanges()
    return this.afDB.collection('recipes').snapshotChanges().pipe(
      map(docArray=>{
        return docArray.map(doc=>{
          console.log('==',{
            id:doc.payload.doc.id,
            data:doc.payload.doc.data()
        });
        return{
          id:doc.payload.doc.id,
          data:doc.payload.doc.data()

        }
      })
    })
    )

  }
//HACE LA CONSULTA SEGUN EL ID  A LS BASE DE DATOS
  async getRecipes(collectionId,docId){
    try {
      const result= await this.afDB.collection(collectionId).doc(docId).ref.get();
      if(result.exists){
        return result.data();
      }else{
        throw new Error ('Data not found with given id');
      }
    } catch (error) {
      throw new Error(error);
      
    }
    
    
  }

 
}
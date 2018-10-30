import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { Executor } from 'selenium-webdriver/http';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /*
  createNewUser(), signInUser() et signOutUser etant des 
  methodes asynchrones, il faudra utiliser des Promises (pour gerer des cas où)
  */
 //REGISTRIERUNG
 createNewUser(email: string, password: string) {
  return new Promise(
    (resolve, reject) => { //executor d creer
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        () => {
          resolve(); //onfulfilled, cela a marché
        },
        (error) => {
          reject(error); //onrejected //cela n a pas marché
        }
      );
    }
  );
}
//ANMELDUNG
signInUser(email: string, password: string) {
  return new Promise( //mettant de synchronise entre an/abmelden
    (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
}
 //ABMELDUNG
 signOutUser(){
   firebase.auth().signOut();
 }
 
}

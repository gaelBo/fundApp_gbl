import { Injectable } from '@angular/core';
import {Book} from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import {DataSnapshot} from 'firebase/database';

@Injectable({
  providedIn: 'root'
})

/*
Pour créer  BooksService  :
vous aurez un array local  books  et un Subject pour l'émettre ;
vous aurez des méthodes :
pour enregistrer la liste des livres sur le serveur,
pour récupérer la liste des livres depuis le serveur,
pour récupérer un seul livre,
pour créer un nouveau livre,
pour supprimer un livre existant.
*/
@Injectable()
export class BooksService {

  books:Book[];
  //books:Book[]=[];
  // es war books:Book[];
  //ERROR TypeError: Cannot read property 'push' of undefined
/*{
  "rules": {
    ".read": true,
    ".write": true
  }
}
*/
  booksSubject=new Subject<Book[]>();

  constructor() { 
    this.getBooks();
  }

  emitBooks(){
    this.booksSubject.next(this.books);
  }

  /*
  La méthode  ref()  retourne une référence au node demandé de la base de données, 
  et  set()  fonctionne plus ou moins comme  put()  pour le HTTP 
  */
  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }
7
//on() permet une mise a jour auto d un appareil dans la bd
  getBooks() {
    firebase.database().ref('/books')
    //DataSnapshot est un objet correspondant au node de la bd
      .on('value', (data: DataSnapshot) => {
        //val()retourne les valeurs des donnees
        // le signe ? est au cas où aucune val n est retournée
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook); //?
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
}

  /*
  l'API Firebase Storage afin de permettre à 
  l'utilisateur d'ajouter une photo du livre, de l'afficher 
  */
 uploadFile(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…');
        },
        (error) => {
          console.log('Erreur de chargement ! : ' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.downloadURL);
        }
      );
    }
  );
}


}

import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MeineBibliothek';

  constructor(){
     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyARBT2RDDpdMbttcKphF0FwJQEYAalpFis",
    authDomain: "mybookmangementgbl.firebaseapp.com",
    databaseURL: "https://mybookmangementgbl.firebaseio.com",
    projectId: "mybookmangementgbl",
    storageBucket: "mybookmangementgbl.appspot.com",
    messagingSenderId: "185846444454"
  };
  firebase.initializeApp(config);
  }
}

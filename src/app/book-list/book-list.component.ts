import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
 /*
souscrit au Subject du service et déclenche sa première émission ;

affiche la liste des livres, où chaque livre peut être cliqué pour en voir la page  SingleBookComponent ;

permet de supprimer chaque livre en utilisant  removeBook() ;

permet de naviguer vers  BookFormComponent  pour la création d'un nouveau livre.  
  */
 
export class BookListComponent implements OnInit {

 
  books:Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
       
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
  
}
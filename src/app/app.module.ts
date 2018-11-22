import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HistoriqueComponent } from './historique/historique.component';
import { NosActionsComponent } from './nos-actions/nos-actions.component';
import { FaireDonComponent } from './faire-don/faire-don.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


const appRoutes:Routes = [
{ path:'auth/signup', component:SignupComponent} , 
{ path: 'auth/signin', component: SigninComponent },
{ path: 'books', canActivate:[AuthGuardService],component: BookListComponent },
{ path: 'kontakt',component: KontaktComponent },
{ path: 'books/new',canActivate:[AuthGuardService], component: BookFormComponent },
{ path: 'books/view/:id', canActivate:[AuthGuardService], component: SingleBookComponent },
{ path: 'accueil',component: AccueilComponent },
{ path: 'historique',component: HistoriqueComponent },
{ path: 'app-nos-actions',component: NosActionsComponent },
{ path: 'app-faire-don',component: FaireDonComponent },
{ path: '', redirectTo: 'books', pathMatch: 'full' },
{ path: '**', redirectTo: 'books' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    KontaktComponent,
    FooterComponent,
    AccueilComponent,
    HistoriqueComponent,
    NosActionsComponent,
    FaireDonComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    //ngx-bootstrap
   // BsDropdownModule.forRoot(),
    CarouselModule.forRoot()

  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

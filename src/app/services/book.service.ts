import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { BookCreateApirequest } from '../_models/request_models/book-createRequest';

@Injectable({
  providedIn: 'root'
})
export class BookService {

public book_ref:any

constructor(private db:AngularFireDatabase) { 
  this.book_ref = this.db.list("books")
}

getBooklist():any{
  return this.book_ref
}

addBooks(requestParams:BookCreateApirequest):any{
  return this.book_ref.push(requestParams)
}
}

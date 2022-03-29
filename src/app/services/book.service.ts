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
  this.book_ref = this.db.object("books")
}

getBooklist():any{
  return this.book_ref
}

getBookbyId(key:string):any{
  return this.db.object("books/"+key)
}

addBooks(requestParams:BookCreateApirequest):any{
  let ref = this.db.list("books")
  return ref.push(requestParams)
}

deleteBook(key: string):any {
  let ref = this.db.list("books")
  return ref.remove(key);
}

updateBook(key:string,requestParams:BookCreateApirequest):any{
  let ref = this.db.list("books")
  return ref.update(key,requestParams)
}

}

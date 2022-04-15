import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { BookViewComponent } from '../book-view/book-view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public book_item: any = [];
  public loading_books: boolean = false;
  term = '';

  constructor(private bookService: BookService,private _matDialog: MatDialog) {}

  ngOnInit() {
    this.fetchBook();
  }

  fetchBook() {
    this.book_item = [];
    this.loading_books = true;
    this.bookService
      .getBooklist()
      .valueChanges()
      .subscribe((result: any) => {
        this.loading_books = false;
        // this.book_item = result
        if(result !=null || result!=undefined){
        var item: any = Object.keys(result).map((key) => ({
          id_key: key,
          books: result[key],
        }));
        this.book_item = item;
      }
      else{
        this.book_item=[]
      }
        console.log('object item', this.book_item);

        // console.log(result)
      }),
      (err: any) => {
        console.log(err);
      };
  }

  bookView(book:any){
    const dialogRef = this._matDialog.open(BookViewComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth:'40%',
      data: {
       book_info : book
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
      }
     
    });
  }
}


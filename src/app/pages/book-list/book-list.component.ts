import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/modals_/confirmation/confirmation.component';
import { BookService } from 'src/app/services/book.service';
import { AddBookComponent } from '../add-book/add-book.component';

export interface Books {
  name: string;
  author_name: string;
  price: number;
  year: string;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'author_name',
    'price',
    'year',
    'action',
  ];
  dataSource = new MatTableDataSource<Books>();

  public isLoadingBooks: boolean = false;

  public user_id?:string


  public new_book_list : any=[]

  constructor(
    private bookService: BookService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private _matDialog: MatDialog
  ) {

    var user_details = JSON.parse(localStorage.getItem('user_details')||'{null}')

    this.user_id = user_details.uid
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator != this.paginator;
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.isLoadingBooks = true;
    this.bookService
      .getBooklist()
      .valueChanges()
      .subscribe((products: any) => {
        this.isLoadingBooks = false;
        // console.log(products)
        if (products != null || products != undefined) {
          var item: any = Object.keys(products).map((key) => ({
            id_key: key,
            books: products[key],
          }));
        } else {
          item = [];
        }

        for(var i=0;i<item.length;i++){
          var book_items :any = item[i].books
          if(book_items.user_id==this.user_id){
            this.new_book_list.push(item[i])
          }
        }

        console.log(this.new_book_list)


        this.dataSource = new MatTableDataSource(this.new_book_list);
        this.dataSource.paginator != this.paginator;
      });
  }
  editBook(book: any): void {
    this.router.navigate(['edit-book/' + book.id_key]);
  }

  deleteBook(book: any) {
    const dialogRef = this._matDialog.open(ConfirmationComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        message:
          'Are you sure you want to remove this Book? This action cannot be undone!',
        title: 'Delete Book',
        action: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
        this.bookService
          .deleteBook(book.id_key)
          .then(() => {
            this.openSnackBar('Book deleted Successfully');
          })
          .catch((err: any) => {
            this.openSnackBar('something went wrong!!');
          });
        this.getProductList();
      }
     
    });
  }

  openSnackBar(message: string) {
    this._snackbar.open(message, 'close', {
      duration: 2000,
    });
  }
}

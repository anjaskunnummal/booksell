import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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

  constructor(
    private bookService: BookService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private _matDialog: MatDialog
  ) {}

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
        this.dataSource = new MatTableDataSource(item);
        this.dataSource.paginator != this.paginator;
      });
  }
  editBook(book: any): void {
    // this.router.navigate(['add-book'])
    // const dialogRef = this._matDialog.open(AddBookComponent, {
    //   disableClose: true,
    //   autoFocus: false,
    //   width: '50%',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == 'check_close') {
    //     console.log(`Dialog result: ${result}`);
    //     this.getProductList();
    //   }
    // });

    this.router.navigate(['edit-book/'+book.id_key])
  }

  deleteBook(book: any) {
    this.bookService
      .deleteBook(book.id_key)
      .then(() => {
        this.openSnackBar('Book deleted Successfully');
      })
      .catch((err: any) => {
        this.openSnackBar('something went wrong!!');
      });
  }

  openSnackBar(message: string) {
    this._snackbar.open(message, 'close', {
      duration: 2000,
    });
  }
}

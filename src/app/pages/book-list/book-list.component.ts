import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';


export interface Books {
  name: string;
  author_name: string;
  price: number;
  year: string;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'author_name', 'price', 'year'];
  dataSource =  new MatTableDataSource<Books>();

  constructor(
    private bookService:BookService,
    private router: Router,
  ) {}

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator != this.paginator;
  }


  ngOnInit () {
    this.getProductList();


  }

  getProductList() {
    // this.isLoadingProducts = true;
    this.bookService.getBooklist().valueChanges().subscribe((products:any) => {
      // this.isLoadingProducts = false;
      console.log(products)
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator != this.paginator;
      console.log(products);
    });
  }

}





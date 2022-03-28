import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 public book_item :any = [];
 public loading_books : boolean = false;

  constructor(private bookService:BookService) { }

  ngOnInit() {

    this.fetchBook()

  }

  fetchBook(){
    this.book_item = [];
    this.loading_books = true
    this.bookService.getBooklist().valueChanges().subscribe(
      (result:any)=>{
        this.loading_books = false
        this.book_item = result
        console.log(result)
      }
    ),
    (err:any)=>{
      console.log(err)
    }
  }



}


//   {
//     image : 'https://5.imimg.com/data5/SELLER/Default/2021/2/SA/IQ/HS/49559104/img-20210211-121925-500x500.jpg',
//     name  :'ABC',
//     price : 499
//   },
//   {
//     image : 'https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg',
//     name  :'ABC',
//     price : 499
//   },
//   {
//     image : 'https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg',
//     name  :'ABC',
//     price : 499
//   },
//   {
//     image : 'https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg',
//     name  :'ABC',
//     price : 499
//   },
//   {
//     image : 'https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg',
//     name  :'ABC',
//     price : 499
//   },
//   {
//     image : 'https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg',
//     name  :'ABC',
//     price : 499
//   },
//   {
//     image : 'https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg',
//     name  :'ABC',
//     price : 499
//   }
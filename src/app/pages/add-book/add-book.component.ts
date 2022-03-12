import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  Book_categories:string[]=['Study Book','Story','Poem']

  constructor() { }

  ngOnInit() {
  }

}

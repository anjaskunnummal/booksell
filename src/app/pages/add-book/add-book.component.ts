import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { BookCreateApirequest } from 'src/app/_models/request_models/book-createRequest';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  public bookRequest: BookCreateApirequest = new BookCreateApirequest();

  Book_categories: string[] = ['Study Book', 'Story', 'Poem'];

  public imageURL?: any;
  public imagePath?:string;

  public bookForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    author_name: new FormControl(''),
    price: new FormControl(0),
    year: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private bookService: BookService,
    private router:Router
  ) {}

  ngOnInit() {}

  Submit() {
    if (this.bookForm.invalid) {
      this.openSnackBar('Some Field Missing');
      return;
    }

    this.createBook(this.bookForm.value);
  }

  createBook(bookform: any) {
    this.bookRequest = {
      name: bookform.name,
      description: bookform.description,
      author_name: bookform.author_name,
      price: bookform.price,
      year: bookform.year,
      image: this.imageURL ? this.imageURL : '',
    };
    this.bookService.addBooks(this.bookRequest).then(() => {
      this.openSnackBar('Book Added Successfully');
      this.router.navigate(['/'])

    });
  }

  onFileChanged(event:any) {
    const file = event.target.files[0];
    if (file.length === 0) return;
    var mimeType = file.type;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    
    };
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }
}

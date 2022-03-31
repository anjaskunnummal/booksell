import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  public button_spinner:boolean = false;

  public book_id?:any=null;
  public isEditingMode : boolean = false;

  public books:any=[]

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
    private router:Router,
    private route:ActivatedRoute
  ) {
    this.book_id = this.route.snapshot.paramMap.get('id')
    if(this.book_id!=null){
      this.bookService.getBookbyId(this.book_id).valueChanges().subscribe((result:any)=>{
        this.books = result
        this.setBookdetails(this.books)
      })
    }
  }

  ngOnInit() {
    
  }

  setBookdetails(books:any){
    this.bookForm = new FormGroup({
      name: new FormControl(books.name, Validators.required),
      description: new FormControl(books.description),
      author_name: new FormControl(books.author_name),
      price: new FormControl(books.price),
      year: new FormControl(books.year),
      category: new FormControl(books.category),
    });
    this.imageURL = books.image;
    this.isEditingMode = true
  }

  Submit() {
    if (this.bookForm.invalid) {
      this.openSnackBar('Some Field Missing');
      return;
    }

    if(this.isEditingMode){
      this.editBook(this.bookForm.value)
      return
    }

    this.createBook(this.bookForm.value);
  }

  createBook(bookform: any) {
    this.button_spinner = true
    this.bookRequest = {
      name: bookform.name,
      description: bookform.description,
      author_name: bookform.author_name,
      price: bookform.price,
      year: bookform.year,
      image: this.imageURL ? this.imageURL : '',
      category : bookform.category
    };
    this.bookService.addBooks(this.bookRequest).then(() => {
      this.button_spinner = false;
      this.openSnackBar('Book Added Successfully');
      this.router.navigate(['/'])

    }).catch((err:any)=>{
      this.openSnackBar('something went wrong!!')
    });
  }

  editBook(bookform:any){

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

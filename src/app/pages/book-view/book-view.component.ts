import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/modals_/confirmation/confirmation.component';
import { CartService } from 'src/app/services/cart.service';
import { cartApiRequst } from 'src/app/_models/request_models/cart-createRequest';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
})
export class BookViewComponent implements OnInit {
  public book_details?: any;

  public cartRequest: cartApiRequst = new cartApiRequst();

  public images: any = [];

  public user_id?: string;
  public user_info?: any;

  constructor(
    public dialogRef: MatDialogRef<BookViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _matDialog: MatDialog
  ) {
    this.book_details = this.data.book_info;
    this.images = this.book_details.image[0];

    this.user_info = localStorage.getItem('user_details');
    if (this.user_info != null) {
      let user = JSON.parse(this.user_info);
      this.user_id = user.uid;
    }
  }

  ngOnInit() {}

  addCart(book: any) {
    if (this.user_info == null) {
      const dialogRef = this._matDialog.open(ConfirmationComponent, {
        disableClose: true,
        autoFocus: false,
        data: {
          message: 'Please login ',
          title: 'Login required',
          action: 'Ok',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'confirm') {
          this.dialogRef.close('confirm');
        }
      });
      return;
    } else {
      this.cartRequest = {
        user_id: this.user_id,
        name: book.name,
        description: book.description,
        author_name: book.author_name,
        price: book.price,
        year: book.year,
        image: book.image,
        category: book.category,
      };
      this.cartService
        .addtoCart(this.cartRequest)
        .then(() => {
          this.openSnackBar('Added to cart');
        })
        .catch((err: any) => {
          this.openSnackBar('something went wrong!!');
        });
    }
  }

  next_image(img: any) {
    for (var i = 0; i <= this.book_details.image.length; i++) {
      if (img == this.book_details.image[i]) {
        if (i == this.book_details.image.length - 1) {
          return;
        }
        this.images = this.book_details.image[i + 1];
      }
    }
  }

  previous_image(img: any) {
    for (var i = 0; i <= this.book_details.image.length; i++) {
      if (img == this.book_details.image[i]) {
        if (i == 0) {
          return;
        }
        this.images = this.book_details.image[i - 1];
      }
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  cancel() {
    this.dialogRef.close('confirm');
  }
}

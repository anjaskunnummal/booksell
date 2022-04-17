import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from 'src/app/modals_/confirmation/confirmation.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public user_id?:string;
  public loading_books : boolean = false

  constructor(private cartService:CartService,
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _snackBar:MatSnackBar) { 

      var user_details = JSON.parse(localStorage.getItem('user_details')||'{null}')

      this.user_id = user_details.uid

    }

  public cart_item:any=[]

  ngOnInit() {

    this.getCartitems()
  }

  getCartitems(){
    this.loading_books = true
    this.cartService.getcartItem().valueChanges().subscribe(
      (products:any)=>{
        if (products != null || products != undefined) {
          var item = Object.keys(products).map((key) => ({
            id_key: key,
            books: products[key],
          }));
        } else {
          item = [];
        }

        for(var i=0;i<item.length;i++){
          var book_items :any = item[i].books
          if(book_items.user_id==this.user_id){
            this.cart_item.push(item[i])
          }
        }
        this.loading_books = false

      }
    )
  }

  remove(book:any){

    const dialogRef = this._matDialog.open(ConfirmationComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        message:
          'Are you sure you want to remove this Book? This action cannot be undone!',
        title: 'Remove Book',
        action: 'Remove',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
        this.cartService
          .removeFromcart(book.id_key)
          .then(() => {
            this.openSnackBar('removed from cart');
          })
          .catch((err: any) => {
            this.openSnackBar('something went wrong!!');
          });
          // this.getCartitems()
          this.dialogRef.close('confirm')
      }
     
    });

  }

  cancel(){
    this.dialogRef.close('confirm')
  }

  openSnackBar(message:string){
    this._snackBar.open(message,'close',{
      duration:2000
    })
  }

}

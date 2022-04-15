import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {

  public book_details?:any;

  public images : any = []

  constructor(public dialogRef: MatDialogRef<BookViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.book_details = this.data.book_info;
      this.images = this.book_details.image[0]
     }

  ngOnInit() {
  }

  next_image(img:any){
    for(var i=0;i<=this.book_details.image.length;i++){
      if(img==this.book_details.image[i]){
        if(i==this.book_details.image.length-1){
          return
        }
        this.images = this.book_details.image[i+1]
      }
    }
  }

  previous_image(img:any){
    for(var i=0;i<=this.book_details.image.length;i++){
      if(img==this.book_details.image[i]){
        if(i==0){
          return
        }
        this.images = this.book_details.image[i-1]
      }
    }
  }

  cancel(){
    this.dialogRef.close('confirm')
  }

}

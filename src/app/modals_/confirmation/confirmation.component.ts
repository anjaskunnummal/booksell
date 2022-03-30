import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {

public title ?: string;
public message ?:string;
public action ?:string

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
    this.action = this.data.action
  }

  ngOnInit() {}

  cancel(){
    this.dialogRef.close("cancel")
  }

  confirm(){
    this.dialogRef.close("confirm")
  }
}

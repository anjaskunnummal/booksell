import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { registerApiRequest } from 'src/app/_models/request_models/register-createRequest';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerRequest : registerApiRequest = new registerApiRequest()

  public registerForm : FormGroup = new FormGroup({
    // first_name : new FormControl(''),
    // last_name : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    // confirm_password : new FormControl('')
  })

  constructor(private _snackBar:MatSnackBar,private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }
  Submit(){
    // if(this.registerForm.value.password!=this.registerForm.value.confirm_password){
    //   this.openSnackBar('Password is mismatching')
    // }

    this.register(this.registerForm.value)
  }

  register(register_val:any){
    this.registerRequest = {
      // first_name : register_val.first_name,
      // last_name : register_val.last_name,
      email : register_val.email,
      password : register_val.password,
      // confirm_password : register_val.confirm_password
    }

    this.authenticationService.register(this.registerRequest).then((result:any)=>{
      this.openSnackBar(result)
    }).catch((err:any)=>{
      this.openSnackBar(err.message)
    })
    
  }

  openSnackBar(message:string){
    this._snackBar.open(message,'close',{
      duration : 2000
    })
  }

}

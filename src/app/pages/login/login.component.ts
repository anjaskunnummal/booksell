import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { loginApiRequest } from 'src/app/_models/register-createRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginRequest : loginApiRequest = new loginApiRequest()

  public users: any = [];

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationService,private _snackBar:MatSnackBar) {}

  ngOnInit() {
    
  }

  Submit(){
    this.login(this.loginForm.value)
  }

  
  login(login_val:any) {
    // this.loginRequest = {
    //   username : login_val.username,
    //   password : login_val.password
    // }
    this.authService.SignIn(login_val.username,login_val.password).then((result:any)=>{
      this.openSnackbar(result)
    })
  }

  openSnackbar(message:string){
    this._snackBar.open(message,'close',{
      duration:2000
    })
  }
}

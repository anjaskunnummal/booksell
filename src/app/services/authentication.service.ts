import { asNativeElements, Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { registerApiRequest } from '../_models/register-createRequest';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router : Router,
  ) {}

  register(requestParams: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(
        requestParams.email,
        requestParams.password
      )
      .then((result) => {
        this.router.navigate(['/login'])
        return 'Registerd Successfully';
      })
      .catch((error) => {
        return error;
      });
  }

  SignIn(email: string, password: any) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        // console.log(Response)
        localStorage.setItem('user_details', JSON.stringify(res.user));
        this.GetToken()
        this.router.navigate([''])
        return 'Welcome!';
      })
      .catch((err) => {
        return 'Something went wrong';
      });
  }

  logout(){
    this.afAuth.signOut()
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('user_details')
    // this.router.navigate(['/thankyou']);
  }

  public userToken :any

  GetToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged( user => {
        if (user) {
          // console.log(user)
          user.getIdToken().then(idToken => {
            this.userToken = idToken;
            localStorage.setItem('access_token',JSON.stringify(this.userToken))
          });
        }
      });
    })
  }
}

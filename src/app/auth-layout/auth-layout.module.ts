import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from '../pages/login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent]
})
export class AuthLayoutModule { }

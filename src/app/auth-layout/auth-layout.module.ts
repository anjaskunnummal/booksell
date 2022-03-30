import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { RegisterComponent } from '../pages/register/register.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    AngularMaterialModule
  ],
  declarations: [LoginComponent,
  RegisterComponent]
})
export class AuthLayoutModule { }

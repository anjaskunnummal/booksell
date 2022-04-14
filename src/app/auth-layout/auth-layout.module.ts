import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { RegisterComponent } from '../pages/register/register.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SampleComponent } from './../pages/sample/sample.component';

@NgModule({
  imports: [
 
  CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [LoginComponent,
  RegisterComponent,
  SampleComponent]
})
export class AuthLayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from '../pages/home/home.component';
import { AddBookComponent } from '../pages/add-book/add-book.component';
import { BookListComponent } from '../pages/book-list/book-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  declarations: [
  HomeComponent,
  AddBookComponent,
  BookListComponent]
})
export class AdminLayoutModule { }

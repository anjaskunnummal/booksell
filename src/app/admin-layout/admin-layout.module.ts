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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationComponent } from '../modals_/confirmation/confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    Ng2SearchPipeModule
  ],
  declarations: [
  HomeComponent,
  AddBookComponent,
  BookListComponent,
  ConfirmationComponent]
})
export class AdminLayoutModule { }

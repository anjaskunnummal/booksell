import { Routes } from '@angular/router';
import { AddBookComponent } from '../pages/add-book/add-book.component';
import { BookListComponent } from '../pages/book-list/book-list.component';
import { HomeComponent } from '../pages/home/home.component';


export const AdminLayoutRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'add-book',component:AddBookComponent},
  {path:'books',component:BookListComponent}
];

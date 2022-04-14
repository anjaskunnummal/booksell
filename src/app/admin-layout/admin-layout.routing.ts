import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AddBookComponent } from '../pages/add-book/add-book.component';
import { BookListComponent } from '../pages/book-list/book-list.component';
import { HomeComponent } from '../pages/home/home.component';
import { SampleComponent } from './../pages/sample/sample.component';


export const AdminLayoutRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'add-book',component:AddBookComponent,canActivate:[AuthGuard]},
  {path:'books',component:BookListComponent,canActivate:[AuthGuard]},
  {path:'edit-book/:id',component:AddBookComponent,canActivate:[AuthGuard]},

];

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { SampleComponent } from '../pages/sample/sample.component';


export const AuthLayoutRoutes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'thankyou',component:SampleComponent}
]

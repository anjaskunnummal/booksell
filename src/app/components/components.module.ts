import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,

  ],
  declarations: [
    SidebarComponent,
    MenuListItemComponent
  ],
  exports: [
    SidebarComponent,
    MenuListItemComponent
  ]
})
export class ComponentsModule { }
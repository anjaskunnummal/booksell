import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems?: any[];
  public isCollapsed = true;

  public user_Name ?:any=null;

  navItems: NavItem[] = [
    {
      displayName: 'Home',
      iconName: 'home',
      route: '',
    },
    {
      displayName: 'Add Book',
      iconName: 'book',
      route: 'add-book',
    },
    {
      displayName: 'Added Books',
      iconName: 'dns',
      route: 'books',
    },
  ];

  constructor() {
    
    var user  = JSON.parse(localStorage.getItem('user_details') || 'null')
    if(user!=null){
    var user_name:string = user.email
    this.user_Name = user_name.substring(0, user_name.indexOf('@')) 
    }
    else{
      this.user_Name = ''
    }
    
  
   }

  ngOnInit() {

  }

}

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

  constructor() { }

  ngOnInit() {
  }

}

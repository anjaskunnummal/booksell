import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/nav.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer?: ElementRef;
  
  // isMobileScreen = false;
  // mode :any= "side";
  opened = true;
  navbutton = false
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  constructor(
    private router: Router, 
    private navService: NavService,
    private breakpointObserver: BreakpointObserver
  ) { 
    // this.isMobileScreen = breakpointObserver.isMatched([
    //   Breakpoints.HandsetLandscape,
    //   Breakpoints.HandsetPortrait
    // ]);

    // breakpointObserver.observe([
    //   Breakpoints.HandsetLandscape,
    //   Breakpoints.HandsetPortrait
    // ]).subscribe(result => {
    //   if (result.matches) {
    //     this.isMobileScreen = true;
    //     this.mode = "over";
    //   } else {
    //     this.isMobileScreen = false;
    //     this.mode = "side";
    //   }
    // });

    // this.mode = this.isMobileScreen ? "over" : "side";
  }

  ngOnInit() {
   
    // this.router.events.subscribe((event) => {
    //   if(this.isMobileScreen) {
    //     this.navService.closeNav();
    //   }
    // });

    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
      this.navbutton = true
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
      // this.navbutton = true
    }

   
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
      this.navbutton = true
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
      this.navbutton=false
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  // ngAfterViewInit() {
  //   this.navService.appDrawer = this.appDrawer;
  // }

  // toggleSideNav() {
  //   this.navService.toggleNav();
  // }
}


import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/nav.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../pages/cart/cart.component';
import { CartService } from '../services/cart.service';

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


  public user_view = false;
  public user_id ?:string;

  public cart_length ?:any;
  public cart:any=[]

  constructor(
    private router: Router, 
    private navService: NavService,
    private breakpointObserver: BreakpointObserver,
    private authservice:AuthenticationService,
    private _matDialog: MatDialog,
    private cartService:CartService
  ) { 
    
    var user  = JSON.parse(localStorage.getItem('user_details') || 'null')
    if(user!=null){
      this.user_view = true;
      this.user_id = user.uid;
      this.getCartlength()
      
    }
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

  getCartlength(){
    this.cart=[]
    this.cartService.getCartLength().valueChanges().subscribe((item:any)=>{
      if(this.cart.length>0){
        this.cart=[]
      }
      for(var i=0;i<item.length;i++){
        if(item[i].user_id==this.user_id){
          this.cart.push(item[i])
          this.cart_length = this.cart.length
        }

      }
    })
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

  logout(){
    this.authservice.logout()
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_details')
    this.router.navigate(['/thankyou']);
    this.user_view = false
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  gotoCart(){
    const dialogRef = this._matDialog.open(CartComponent, {
      disableClose: true,
      autoFocus: false,
      height:'70%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
      }
     
    });

  }

  // ngAfterViewInit() {
  //   this.navService.appDrawer = this.appDrawer;
  // }

  // toggleSideNav() {
  //   this.navService.toggleNav();
  // }
}


import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-store',
  templateUrl: './navbar-store.component.html',
  styleUrls: ['./navbar-store.component.scss']
})
export class NavbarStoreComponent implements OnInit{

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.onWindowWidth();
  }

  public onLinkClick(link: string){
    this.router.navigate(['/application/customer'+link]);
    this.isLinksOpened = false;
  }

  public isLinksOpened: boolean = false;
  public openCloseLinks(){
    this.isLinksOpened = !this.isLinksOpened;
  }

  @HostListener('window: resize')
  public onWindowWidth(){
    if(window.innerWidth >= 650){
      this.isLinksOpened = false;
    }
  }
}

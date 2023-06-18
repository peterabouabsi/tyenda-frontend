import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-navbar-customer',
  templateUrl: './navbar-customer.component.html',
  styleUrls: ['./navbar-customer.component.scss']
})
export class NavbarCustomerComponent implements OnInit{

  constructor(private router: Router,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.onWindowWidth();
  }

  public onLinkClick(link: string){
    this.router.navigate(['/application/customer/'+link]);
    this.isLinksOpened = false;
    this.optionsOpenIndex = 0;
  }

  /*open-close profile|notification options menu*/
  public optionsOpenIndex: number = 0;
  public onFocusOut(){
    this.optionsOpenIndex = 0
  }
  public onFocus(index: number){
    if(this.optionsOpenIndex != index) this.optionsOpenIndex = index;
    else this.optionsOpenIndex = 0;
  }
  /*--------------------------------------------*/

  /*Profile Options*/
  public editProfile(){}
  public changePassword(){}
  public logout(){
    this.globalService.logout().then(() => {
      this.router.navigate(['/authentication']);
    });
  }
  /*------------------------------------------------*/

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

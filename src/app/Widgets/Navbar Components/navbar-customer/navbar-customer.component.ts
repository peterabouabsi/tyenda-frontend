import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Components
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import { ToastrComponent } from '../../Other Components/toastr/toastr.component';

//Views
import { ViewModerateNotification } from 'src/app/Shared/Models/Views/Notification/ViewModerateNotification.view';

@Component({
  selector: 'app-navbar-customer',
  templateUrl: './navbar-customer.component.html',
  styleUrls: ['./navbar-customer.component.scss']
})
export class NavbarCustomerComponent implements OnInit{

  @ViewChild('toastr') toastr: ToastrComponent; public viewToastr: boolean = false;

  public notifications: ViewModerateNotification[] = [];

  constructor(private router: Router,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.onWindowWidth();
    this.readNotifications();
  }

  private readNotifications(){
    this.globalService.getMyNotifications().subscribe((response: any) => {
      if(!response.error){
        this.notifications = response;
      }
    });
  }

  /*Open and set notification as viewed*/
  public openNotification(notification: any){
    const {link, id} = notification;
    this.globalService.viewNotification(id).subscribe((response: any) => {
      if(!response.error){
        this.optionsOpenIndex = 0;
        this.readNotifications();
        this.router.navigate([link]);
      }
    });
  }
  /*------------------------------------------------*/

  /*Profile Options*/
  public editProfile(){}
  public changePassword(){
    this.globalService.openDialog(ChangePwdComponent, {}, (response: any) => {
      if(!response.error){
        this.viewToastr = true;
        setTimeout(() => {this.toastr.onSuccess('Change Password', response.message, 5)}, 100);
      }
    });
  }
  public logout(){
    this.globalService.logout().then(() => {
      this.router.navigate(['/authentication']);
    });
  }
  /*------------------------------------------------*/

  /*on link click*/
  public onLinkClick(link: string){
    this.router.navigate(['/application/customer/'+link]);
    this.isLinksOpened = false;
    this.optionsOpenIndex = 0;
  }
  /*------------------------------------------------*/

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

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//environment
import { environment } from 'src/environments/environments';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Components
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import { ToastrComponent } from '../../Other Components/toastr/toastr.component';
import { AlertComponent } from '../../Other Components/alert/alert.component';
import { EditStoreComponent } from '../edit-store/edit-store.component';
import { EditBranchesComponent } from '../edit-branches/edit-branches.component';

//Views
import { ViewModerateNotification } from 'src/app/Shared/Models/Views/Notification/ViewModerateNotification.view';

@Component({
  selector: 'app-navbar-store',
  templateUrl: './navbar-store.component.html',
  styleUrls: ['./navbar-store.component.scss']
})
export class NavbarStoreComponent implements OnInit{

  public fileBaseUrl: string = environment.fileBaseUrl;

  @ViewChild('toastr') toastr: ToastrComponent; public viewToastr: boolean = false;

  public notifications: ViewModerateNotification[] = [];
  public profileImage: string = '';

  constructor(private router: Router,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.onWindowWidth();
    this.readNotifications();
    this.readProfileImage();
  }

  private readNotifications(){
    this.globalService.getMyNotifications().subscribe((response: any) => {
      if(!response.error){
        this.notifications = response;
      }
    });
  }

  private readProfileImage(){
    this.globalService.getProfileImage().subscribe((response: any) => {
      if(!response.error){
        this.profileImage = response.profileImage;
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
  public editBranches(){
    this.globalService.openDialog(EditBranchesComponent, {}, (dialog: any, response: any) => {
      if(response){
        this.viewToastr = true;
        if(!response.error){
          setTimeout(() => {this.toastr.onSuccess('Edit Branch', response.message, 5)}, 100);
        }else{
          setTimeout(() => {this.toastr.onDanger('Edit Branch', response.error, 5)}, 100);
        }
      }
    });
  }
  public editProfile(){
    this.globalService.openDialog(EditStoreComponent, {}, (dialog: any, response: any) => {
      if(response){
        this.viewToastr = true;
        if(!response.error){
          this.readProfileImage();
          this.globalService.onProfileImageUpdate(this.profileImage);
          setTimeout(() => {this.toastr.onSuccess('Edit Profile', response.message, 5)}, 100);
        }else{
          setTimeout(() => {this.toastr.onDanger('Edit Profile', response.error, 5)}, 100);
        }
      }
    });
  }
  public changePassword(){
    this.globalService.openDialog(ChangePwdComponent, {}, (dialog: any, response: any) => {
      if(!response.error){
        this.viewToastr = true;
        setTimeout(() => {this.toastr.onSuccess('Change Password', response.message, 5)}, 100);
      }
    });
  }
  public onLogout: boolean = false;
  public logout(){
    this.globalService.openDialog(AlertComponent,
      {
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        buttons: [
          {
            value: 'Logout', color: 'red', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
              if (this.onLogout == false) {
                this.globalService.logout().then(() => {
                  setTimeout(() => {
                    dialogRef.close();
                    this.router.navigate([Constants.AUTH_MAIN_ROUTE]);
                  }, 3000)
                });
              }
            }
          },
          { value: 'Cancel', color: 'gray', onButtonClick: (dialogRef: any) => { dialogRef.close() } }
        ]
      }
      , null);
  }
  /*------------------------------------------------*/

  /*on link click*/
  public onLinkClick(link: string){
    this.router.navigate([Constants.APP_MAIN_ROUTE_STORE+link]);
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

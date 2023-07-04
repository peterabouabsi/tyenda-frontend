import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

//Modules
import { MatDialog } from '@angular/material/dialog';

//Constants
import { Constants } from '../../Models/constants.model';

//Forms
import { LogoutForm } from 'src/app/Shared/Models/Forms/LogoutForm.form';
import { ChangePasswordForm } from './../../Models/Forms/ChangePasswordForm.form';

//Services
import { ApiService } from './../Api/api.service';

//Views
import { BasicTimestampView } from '../../Models/Views/Timestamp/BasicTimestampView.view';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private router: Router,
              private dialog: MatDialog,
              private apiService: ApiService) {
  }

  //Global HTTP Requests and Data
  public getAccountRole() {
    return this.apiService.get('/Account/Role()');
  }
  public changePassword(changePasswordForm: ChangePasswordForm){
    return this.apiService.post('/Account/ChangePassword()', changePasswordForm);
  }
  public isTokenExpired(token: string) {
    return this.apiService.post('/Session/Check()', { token: token });
  }
  public getCountries() {
    return this.apiService.getAnonymous('/Country');
  }
  public getCities(countryId: string) {
    return this.apiService.getAnonymous('/City/' + countryId);
  }
  public getCategories() {
    return this.apiService.getAnonymous('/Category');
  }
  public getMyNotifications(){
    return this.apiService.get('/Notification');
  }
  public getItemComments(itemId: string){
    return this.apiService.get('/Comment/'+itemId);
  }
  public deleteComment(commentId){
    return this.apiService.delete('/Comment/'+commentId);
  }
  public viewNotification(notificationId: string){
    return this.apiService.post('/Notification/View/'+notificationId);
  }
  public getTimestamps(){
    var now = new Date();
    var last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    var last48Hours = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    var lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    var lastMonth = new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000);
    var last6Months = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
    var lastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    // Generate the date ranges
    var timestamps: BasicTimestampView[] = [
      { value: "Last 24 hours", id: last24Hours.toISOString() },
      { value: "Last 48 hours", id: last48Hours.toISOString() },
      { value: "Last week", id: lastWeek.toISOString() },
      { value: "Last month", id: lastMonth.toISOString() },
      { value: "Last 6 months", id: last6Months.toISOString() },
      { value: "Last year", id: lastYear.toISOString() }
    ];
    return timestamps;
  }
  public getOrderStatuses(){
    return ['Submitted', 'Rejected', 'Approved', 'OnGoing', 'Completed']
  }
  public async logout(){
    let session = this.getStorage(Constants.STORAGE_SESSION);
    let logoutForm: LogoutForm = {
      accessToken: session? session.accessToken: '',
      refreshToken: session? session.refreshToken: ''
    };
    let response = await this.apiService.post('/Account/logout()', logoutForm).toPromise();
    if(!response.error){
      this.clearStorage();
    }
  }

  //Check existancy in an array
  public checkExistancy(array: any[], filter: any, callback = (exist: boolean, index?: number) => { }) {
    let exist = false;
    let existAtIndex = -1;
    if(typeof filter !== 'object'){
      for (const item of array) {
        if(item == filter){
          exist = true;
          existAtIndex = array.indexOf(item);
          break;
        }
      }
    }else{
      for (const item of array) {
        let match = true;
        for (const key in filter) {
          if (item[key] !== filter[key]) {
            match = false;
            existAtIndex = array.indexOf(item);
            break;
          }
        }
        if (match) {
          exist = true;
          break;
        }
      }
    }
    callback(exist, existAtIndex);
  }
  //Check object validity
  public checkFormValidity(form: any, properties: string[], callback = (valid: boolean) => { }) {
    let invalid = false;
    // Check if required properties are empty objects, strings, or arrays
    properties.forEach(property => {
      if ((typeof form[property] === 'object' && Object.keys(form[property]).length === 0) ||
          form[property] === '' ||
          (Array.isArray(form[property]) && form[property].length === 0)) {
        invalid = true;
      }
    });

    // Perform additional property-specific validation if needed
    // For example, validate email format or phone number format

    // Call the callback function
    callback(!invalid);
  }
  //Check authenticated user
  public async isAuthenticated(){
    let session = this.getStorage(Constants.STORAGE_SESSION);
    if(session){
      let response = await this.getAccountRole().toPromise();
      return {isAuth: true, role: response.role}
    }
    return {isAuth: false, role: null};
  }
  //Check if the device is touchable
  public checkTouchDevice(){
    return 'ontouchstart' in window;
  }

  //LocalStorage
  public setStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  public deleteStorage(key: string) {
    localStorage.removeItem(key);
  }
  public clearStorage() {
    localStorage.clear();
  }

  //Reload page alert
  public showReloadAlert(message: string, event: any, callback = (reload: boolean) => { }) {
    event.preventDefault();
    event.returnValue = '';
    const confirmationMessage = message;
    event.returnValue = confirmationMessage;
    callback(true);
  }

  //Dialog Components
  public openDialog(component: any, data: any = {}, callback = (result?: any) => {}){
    let dialog = this.dialog.open(component, {
      data: data
    });

    dialog.afterClosed().subscribe((result?: any) => {
      callback(result);
    })
  }

  //Remove all query params
  public async removeQueryParameterAsync() {
    new Promise(() => {
      // Get the current route URL without query parameters
      const urlTree = this.router.parseUrl(this.router.url);
      urlTree.queryParams = {};

      // Create navigation extras without preserving the query parameters
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: '',
        preserveFragment: true,
      };

      // Navigate to the updated route
      this.router.navigateByUrl(urlTree.toString(), navigationExtras);

    })
  }
}

import { Injectable } from '@angular/core';

//Modules
import { MatDialog } from '@angular/material/dialog';

//Constants
import { Constants } from '../../Models/constants.model';

//Forms
import { LogoutForm } from 'src/app/Shared/Models/Forms/LogoutForm.form';
import { ChangePasswordForm } from './../../Models/Forms/ChangePasswordForm.form';

//Services
import { ApiService } from './../Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private dialog: MatDialog,
              private apiService: ApiService) {
  }

  //Global HTTP Requests
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
  public checkExistancy(array: any[], filter: any = {}, callback = (exist: boolean) => { }) {
    let exist = false;
    for (const item of array) {
      let match = true;
      for (const key in filter) {
        if (item[key] !== filter[key]) {
          match = false;
          break;
        }
      }
      if (match) {
        exist = true;
        break;
      }
    }
    callback(exist);
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
}

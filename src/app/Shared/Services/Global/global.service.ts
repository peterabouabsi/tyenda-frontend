import { Injectable } from '@angular/core';

//Services
import { ApiService } from './../Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private apiService: ApiService) {
  }

  //Global HTTP Requests
  public getAccountRole() {
    return this.apiService.get('/Account/Role()');
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

}

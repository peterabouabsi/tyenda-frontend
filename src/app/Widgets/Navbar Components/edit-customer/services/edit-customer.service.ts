import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EditCustomerService {

  constructor(private apiService: ApiService) {
  }

  public getCustomerProfile() {
    return this.apiService.get('/Customer/Profile');
  }
}

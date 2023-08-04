import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreHomeService {

  constructor(private apiService: ApiService) { }

  public getRecentOrders(){
    return this.apiService.get('/Order/Recent()');
  }
}

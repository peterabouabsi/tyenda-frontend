import { Injectable } from '@angular/core';

//Services
import { ApiService } from './../../../../../Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) { }

  public getOrder(orderId: string){
    return this.apiService.get('/Order/'+orderId);
  }
}

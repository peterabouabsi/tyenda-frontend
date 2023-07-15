import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RequestOrderService {

  constructor(private apiService: ApiService) { }

  public getItem(itemId: string){
    return this.apiService.get('/Item/OrderRequest/'+itemId);
  }

}

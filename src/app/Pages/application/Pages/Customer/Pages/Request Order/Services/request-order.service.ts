import { Injectable } from '@angular/core';

//Forms
import { RequestOrderForm } from 'src/app/Shared/Models/Forms/RequestOrderForm.form';

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

  public requestOrder(form: RequestOrderForm){
    return this.apiService.post('/Order/Request()', form);
  }

}

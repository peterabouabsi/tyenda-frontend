import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { OrdersSearchForm } from 'src/app/Shared/Models/Forms/OrdersSearchForm.form';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrdersService {

  constructor(private apiService: ApiService) { }

  public searchOrders(form: OrdersSearchForm){
    return this.apiService.post('/Order/Search()', form);
  }
}

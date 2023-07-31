import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddFeedbackForm } from 'src/app/Shared/Models/Forms/AddFeedbackForm.form';
import { ConfirmOrderForm } from 'src/app/Shared/Models/Forms/ConfirmOrderForm.form';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) { }

  public getOrder(orderId: string){
    return this.apiService.get('/Order/'+orderId);
  }

  public addFeedback(form: AddFeedbackForm){
    return this.apiService.post('/Order/Feedback/Add()', form);
  }

  public confirmOrder(form: ConfirmOrderForm){
    return this.apiService.post('/Order/Confirm()', form);
  }

  public deleteOrder(orderId: string){
    return this.apiService.delete('/Order/Delete/' + orderId);
  }

}

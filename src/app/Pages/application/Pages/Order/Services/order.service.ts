import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddFeedbackForm } from 'src/app/Shared/Models/Forms/AddFeedbackForm.form';
import { ConfirmCompleteOrderForm } from 'src/app/Shared/Models/Forms/ConfirmCompleteOrderForm.form';
import { ApproveRejectForm } from 'src/app/Shared/Models/Forms/ApproveRejectForm.form';

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

  public confirmOrder(form: ConfirmCompleteOrderForm){
    return this.apiService.post('/Order/Confirm()', form);
  }

  public deleteOrder(orderId: string){
    return this.apiService.delete('/Order/Delete/' + orderId);
  }

  public approveReject(form: ApproveRejectForm){
    return this.apiService.post('/Order/ApproveReject()', form);
  }

  public completeOrder(form: ConfirmCompleteOrderForm){
    return this.apiService.post('/Order/Complete()', form);
  }
}

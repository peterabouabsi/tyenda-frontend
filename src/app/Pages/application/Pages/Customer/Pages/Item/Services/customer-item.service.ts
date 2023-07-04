import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { LikeItemForm } from 'src/app/Shared/Models/Forms/LikeItemForm.form';
import { RateItemForm } from 'src/app/Shared/Models/Forms/RateItemForm.form';
import { AddCommentForm } from 'src/app/Shared/Models/Forms/AddCommentForm.form';

@Injectable({
  providedIn: 'root'
})
export class CustomerItemService {

  constructor(private apiService: ApiService) { }


  public getItemDescription(itemId: string){
    return this.apiService.get('/Item/'+itemId);
  }
  public getMyItemOrders(itemId: string){
    return this.apiService.get('/Item/'+itemId+"/MyOrders()");
  }
  public addRemoveCart(form: AddRemoveCartForm){
    return this.apiService.post('/Item/AddRemoveCart()', form);
  }
  public likeDislike(form: LikeItemForm){
    return this.apiService.post('/Item/Like()', form);
  }
  public rateItem(form: RateItemForm){
    return this.apiService.post('/Item/Rate()', form);
  }
  public addComment(form: AddCommentForm){
    return this.apiService.post('/Comment/Add()', form);
  }
}

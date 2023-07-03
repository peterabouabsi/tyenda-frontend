import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { LikeItemForm } from 'src/app/Shared/Models/Forms/LikeItemForm.form';

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
  public rateItem(form: any){
    return this.apiService.post('/Item/Rate()', form);
  }
}

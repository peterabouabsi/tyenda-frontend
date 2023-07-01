import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { LikeItemForm } from 'src/app/Shared/Models/Forms/LikeItemForm.form';
import { ItemCartUpdateForm } from 'src/app/Shared/Models/Forms/ItemCartUpdateForm.form';

@Injectable({
  providedIn: 'root'
})
export class ItemCardService {

  constructor(private apiService: ApiService) { }

  public likeDislike(form: LikeItemForm){
    return this.apiService.post('/Item/Like()', form);
  }

  public addRemoveCart(form: AddRemoveCartForm){
    return this.apiService.post('/Item/AddRemoveCart()', form);
  }

  public updateQuantity(form: ItemCartUpdateForm){
    return this.apiService.post('/Cart/Update()', form);
  }

}

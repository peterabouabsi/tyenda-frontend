import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { FollowUnfollowForm } from 'src/app/Shared/Models/Forms/FollowUnfollowForm.form';
import { AddToCartForm } from 'src/app/Shared/Models/Forms/AddToCartForm.form';

@Injectable({
  providedIn: 'root'
})
export class StoreCardService {

  constructor(private apiService: ApiService) { }

  public addRemoveCart(form: AddToCartForm){
    return this.apiService.post('/Store/AddCart()', form);
  }

  public followUnfollow(form: FollowUnfollowForm){
    return this.apiService.post('/Store/Follow()', form);
  }
}

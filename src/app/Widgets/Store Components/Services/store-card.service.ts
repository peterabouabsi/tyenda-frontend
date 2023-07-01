import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { FollowUnfollowForm } from 'src/app/Shared/Models/Forms/FollowUnfollowForm.form';
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';

@Injectable({
  providedIn: 'root'
})
export class StoreCardService {

  constructor(private apiService: ApiService) { }

  public addRemoveCart(form: AddRemoveCartForm){
    return this.apiService.post('/Store/AddRemoveCart()', form);
  }

  public followUnfollow(form: FollowUnfollowForm){
    return this.apiService.post('/Store/Follow()', form);
  }
}

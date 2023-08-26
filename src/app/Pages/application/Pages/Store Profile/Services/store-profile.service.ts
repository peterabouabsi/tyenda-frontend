import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { FollowUnfollowForm } from 'src/app/Shared/Models/Forms/FollowUnfollowForm.form';

@Injectable({
  providedIn: 'root'
})
export class StoreProfileService {

  constructor(private apiService: ApiService) { }

  public getStore(storeId: string){
    return this.apiService.get('/Store/Profile'+(storeId? '?storeId='+storeId : ''));
  }
  public getStoreTopItems(storeId: string){
    return this.apiService.get('/Store/TopItems/'+storeId);
  }

  /* Role: Customer*/
  public addRemoveCart(form: AddRemoveCartForm){
    return this.apiService.post('/Store/AddRemoveCart()', form);
  }
  public followUnfollow(form: FollowUnfollowForm){
    return this.apiService.post('/Store/Follow()', form);
  }
  /* Role: Customer*/

  /* Role: Store*/
  public addRemoveNewBranch(){}
  public updateImage(){}
  //...
  /* Role: Store*/

}

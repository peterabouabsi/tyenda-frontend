import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreProfileService {

  constructor(private apiService: ApiService) { }

  public getStore(storeId: string){
    return this.apiService.get('/Store/Profile/'+storeId);
  }
}

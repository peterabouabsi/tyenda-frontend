import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreItemService {

  constructor(private apiService: ApiService) { }

  public getItemDescription(itemId: string){
    return this.apiService.get('/Item/'+itemId);
  }

}

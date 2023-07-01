import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apiService: ApiService) { }

  public readCart(type: string, top: number){
    return this.apiService.get('/Cart/'+type+'?top='+top);
  }

}

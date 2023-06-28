import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddToCartForm } from 'src/app/Shared/Models/Forms/AddToCartForm.form';

@Injectable({
  providedIn: 'root'
})
export class ItemCardService {

  constructor(private apiService: ApiService) { }

  public addRemoveCart(form: AddToCartForm){
    return this.apiService.post('/Item/AddCart()', form);
  }

}

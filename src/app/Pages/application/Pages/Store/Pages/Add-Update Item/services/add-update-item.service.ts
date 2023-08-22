import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddUpdateItemForm } from 'src/app/Shared/Models/Forms/AddUpdateItemForm.form';

@Injectable({
  providedIn: 'root'
})
export class AddUpdateItemService {

  constructor(private apiService: ApiService) { }

  public getItemDescription(itemId: string){
    return this.apiService.get('/Item/Update/'+itemId);
  }

  public addUpdate(form: AddUpdateItemForm){
    return this.apiService.post('/Item/AddUpdate()', form);
  }

  public addUpdateImage(form: FormData){
    return this.apiService.post('/Item/Image/AddUpdate', form);
  }
}

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

  public addUpdate(form: AddUpdateItemForm){
    return this.apiService.post('/Item/AddUpdate()', form);
  }
}

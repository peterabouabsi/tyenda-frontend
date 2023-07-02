import { Injectable } from '@angular/core';

//Forms
import { ItemStoreSearchForm } from 'src/app/Shared/Models/Forms/ItemStoreSearchForm.form';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerSearchService {

  constructor(private apiService: ApiService) { }

  public searchData(type: string, form: ItemStoreSearchForm){
    return this.apiService.post('/'+type+'/Search()', form);
  }
}

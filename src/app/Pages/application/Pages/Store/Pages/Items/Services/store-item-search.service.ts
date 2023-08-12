import { Injectable } from '@angular/core';

//Forms
import { ItemStoreSearchForm } from 'src/app/Shared/Models/Forms/ItemStoreSearchForm.form';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreItemSearchService {

  constructor(private apiService: ApiService) { }

  public searchData(form: ItemStoreSearchForm){
    return this.apiService.post('/Item/Search()', form);
  }
}

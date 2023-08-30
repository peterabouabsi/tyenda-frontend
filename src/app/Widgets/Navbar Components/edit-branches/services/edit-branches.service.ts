import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { AddUpdateBranchesForm } from 'src/app/Shared/Models/Forms/AddUpdateBranchesForm.form';

@Injectable({
  providedIn: 'root'
})
export class EditBranchesService {

  constructor(private apiService: ApiService) { }

  public addUpdateBranches(form: AddUpdateBranchesForm[]){
    return this.apiService.post('/Store/Branch/AddUpdate()', form);
  }

}

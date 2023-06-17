import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit{

  public step: number = 1;
  public storeData: any = {};

  public accountInfoForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
  });

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getStoreData();
  }

  private getStoreData(){
    this.storeData = this.globalService.getStorage(Constants.STORAGE_STORE_DATA);
    for (const key in this.storeData) {
      if (this.storeData.hasOwnProperty(key) && this.accountInfoForm.controls[key]) {
        this.accountInfoForm.get(key).setValue(this.storeData[key]);
      }
    }
  }
  private setStoreData(){
    this.globalService.setStorage(Constants.STORAGE_STORE_DATA, this.storeData);
  }

  public setValue(controleName: string, value: string){
    this.accountInfoForm.get(controleName).setValue(value);
    this.storeData[controleName] = value;

    if(value == '' || value == null) {
      delete this.storeData[controleName];
    }

    this.setStoreData();
  }

  public markFormAsDirty() {
    Object.keys(this.accountInfoForm.getRawValue()).forEach(formControlName => {
      this.accountInfoForm.get(formControlName).markAsDirty();
    });
  }

}

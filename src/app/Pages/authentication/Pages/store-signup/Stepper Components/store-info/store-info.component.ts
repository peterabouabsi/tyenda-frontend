import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent implements OnInit{

  public step: number = 2;
  public storeData: any = {};

  public storeInfoForm: FormGroup = new FormGroup({
    storeName: new FormControl('', [Validators.required]),
    ownerName: new FormControl('', [Validators.required]),
    ownerEmail: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getStoreData();
  }

  private getStoreData(){
    this.storeData = this.globalService.getStorage(Constants.STORAGE_STORE_DATA);
    for (const key in this.storeData) {
      if (this.storeData.hasOwnProperty(key) && this.storeInfoForm.controls[key]) {
        this.storeInfoForm.get(key).setValue(this.storeData[key]);
      }
    }
  }
  private setStoreData(){
    this.globalService.setStorage(Constants.STORAGE_STORE_DATA, this.storeData);
  }

  public setValue(controleName: string, value: string){
    this.storeInfoForm.get(controleName).setValue(value);
    this.storeData[controleName] = value;

    if(value == '' || value == null) {
      delete this.storeData[controleName];
    }

    this.setStoreData();
  }

  public markFormAsDirty() {
    Object.keys(this.storeInfoForm.getRawValue()).forEach(formControlName => {
      this.storeInfoForm.get(formControlName).markAsDirty();
    });
  }

}

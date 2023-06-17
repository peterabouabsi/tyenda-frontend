import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Views
import { BasicCountryView } from 'src/app/Shared/Models/Views/Country/BasicCountryView.view';
import { BasicCityView } from 'src/app/Shared/Models/Views/City/BasicCityView.view';

@Component({
  selector: 'app-store-branch',
  templateUrl: './store-branch.component.html',
  styleUrls: ['./store-branch.component.scss']
})
export class StoreBranchComponent implements OnInit {

  public step: number = 3;
  public storeData: any = {};

  public storeBranchForms: FormGroup[] = [];
  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getStoreData();
    this.readCountries();
  }

  //Get the branches saved in storeData (localstorage) if exist
  private getStoreData(){
    this.storeData = this.globalService.getStorage(Constants.STORAGE_STORE_DATA);
    //There are branches added
    if(this.storeData.hasOwnProperty('branches')){
      let branches = this.storeData['branches'];

      for (let i = 0; i < branches.length; i++) {
        let country = branches[i].country;
        let city = branches[i].city;
        let addressDetails = branches[i].addressDetails;

        this.addNewBranch(country, city, addressDetails);
      }

    }else{
      //No branches added yet
      this.storeBranchForms = [new FormGroup({ country: new FormControl(null, [Validators.required]), city: new FormControl(null, [Validators.required]), addressDetails: new FormControl('', [Validators.required]) })]
    }
  }
  //-------------------------------------------------------------

  //Read Countries from backend
  private readCountries() {
    this.globalService.getCountries().subscribe((response: any) => {
      if (!response.error) {
        this.countries = response;
      }
    });
  }
  //-------------------------------------------------------------

  //Save the storeData in localstorage
  private setStoreData(){
    this.globalService.setStorage(Constants.STORAGE_STORE_DATA, this.storeData);
  }
  //-------------------------------------------------------------

  public setValue(formControl: string, value: any, index: number) {
    this.storeBranchForms[index].get(formControl).setValue(value);

    if (formControl == 'country') {
      this.globalService.getCities(value.id).subscribe((response: any) => {
        if (!response.error) {
          this.cities = response;
        }
      });
    }

    //Modify branch on storeData (localstorage data)
    this.storeData['branches'] = this.storeBranchForms.map((formGroup) => {
      return {
        country: {
          id: formGroup.get('country').value?.id,
          value: formGroup.get('country').value?.value
        },
        city: {
          id: formGroup.get('city').value?.id,
          value: formGroup.get('city').value?.value
        },
        addressDetails: formGroup.get('addressDetails').value
      };
    });
    this.setStoreData();
  }

  public addNewBranch(country: any = null, city: any = null, addressDetails: string = '') {
    this.storeBranchForms.push(new FormGroup({ country: new FormControl(country, [Validators.required]), city: new FormControl(city, [Validators.required]), addressDetails: new FormControl(addressDetails, [Validators.required]) }))
  }

  public removeBranch(index: number){

    this.storeBranchForms.splice(index, 1);
    if(this.storeData['branches']) this.storeData['branches'].splice(index, 1);
    this.setStoreData();
  }

}

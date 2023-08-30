import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

//Configurations
import { ButtonConfig } from '../../Button Components/button-loader/ButtonConfig.form';

//Forms
import { AddUpdateBranchesForm } from 'src/app/Shared/Models/Forms/AddUpdateBranchesForm.form';

//Views
import { BasicCityView } from 'src/app/Shared/Models/Views/City/BasicCityView.view';
import { BasicCountryView } from 'src/app/Shared/Models/Views/Country/BasicCountryView.view';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { EditBranchesService } from './services/edit-branches.service';

//Components
import { ButtonLoaderComponent } from '../../Button Components/button-loader/button-loader.component';

@Component({
  selector: 'app-edit-branches',
  templateUrl: './edit-branches.component.html',
  styleUrls: ['./edit-branches.component.scss']
})
export class EditBranchesComponent implements OnInit {

  @ViewChild('saveProfileButton') saveProfileButton: ButtonLoaderComponent; public saveBranchesButtonConfig: ButtonConfig = { isBlue: true }

  public storeBranchForms: FormGroup[] = [];
  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];

  constructor(private dialogRef: MatDialogRef<EditBranchesComponent>,
              private globalService: GlobalService,
              private editBranchesService: EditBranchesService) {
  }

  ngOnInit(): void {
    this.readCountries();
  }

  ngAfterViewInit(): void {
    this.getBranches();
  }

  private readCountries() {
    this.globalService.getCountries().subscribe((response: any) => {
      if (!response.error) {
        this.countries = response;
      }
    });
  }

  //Get the branches saved in storeData (localstorage) if exist
  private async getBranches(){
    //GET BRANCHES
    let branches = await this.globalService.getStoreBranches().toPromise();

    //There are branches added
    if(branches.length > 0){
      for (let i = 0; i < branches.length; i++) {
        let country = branches[i].country;
        let city = branches[i].city;
        let addressDetails = branches[i].addressDetails;
        let lat = branches[i].lat;
        let lng = branches[i].lng;
        this.addNewBranch(country, city, addressDetails, lat, lng);
      }

    }else{
      //No branches added yet
      this.storeBranchForms = [
        new FormGroup({
          country: new FormControl(null, [Validators.required]),
          city: new FormControl(null, [Validators.required]),
          addressDetails: new FormControl('', [Validators.required]),
          lat: new FormControl(0, [Validators.required]),
          lng: new FormControl(0, [Validators.required])
        })
      ]
    }
  }

  public setValue(formControl: string, value: any, index: number) {
    this.storeBranchForms[index].get(formControl).setValue(value);

    if (formControl == 'country') {
      this.globalService.getCities(value.id).subscribe((response: any) => {
        if (!response.error) {
          this.cities = response;
        }
      });
    }
  }

  public addNewBranch(country: any = null, city: any = null, addressDetails: string = '', lat: number = 0, lng: number = 0,) {
    this.storeBranchForms.push(new FormGroup({
      country: new FormControl(country, [Validators.required]),
      city: new FormControl(city, [Validators.required]),
      addressDetails: new FormControl(addressDetails, [Validators.required]),
      lat: new FormControl(lat, [Validators.required]),
      lng: new FormControl(lng, [Validators.required])
    }))
  }

  public removeBranch(index: number) {
    this.storeBranchForms.splice(index, 1);
  }

  public closeEditProfile() {
    this.dialogRef.close();
  }

  public saveProfile() {
    let form: AddUpdateBranchesForm[] = this.storeBranchForms.map((branchForm: any) => {
      return {
        cityId: branchForm.get('city').value.id,
        addressDetails: branchForm.get('addressDetails').value,
        lat: branchForm.get('lat').value,
        lng: branchForm.get('lng').value
      }
    })

    this.editBranchesService.addUpdateBranches(form).subscribe((response: any) => {
      if(!response.error){
        this.dialogRef.close(response);
      }
    })

  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

//Config
import { ButtonConfig } from '../../Button Components/button-loader/ButtonConfig.form';

//Views
import { BasicCategoryView } from 'src/app/Shared/Models/Views/Category/BasicCategoryView.view';
import { StoreAdvancedView } from 'src/app/Shared/Models/Views/Store/StoreAdvancedView.view';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Environments
import { environment } from 'src/environments/environments';
import { ButtonLoaderComponent } from '../../Button Components/button-loader/button-loader.component';

//Forms
import { UpdateProfileForm } from 'src/app/Shared/Models/Forms/UpdateProfileForm.form';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit{

  /* ---------- Global variables */
  public fileBaseUrl: string = environment.fileBaseUrl;

  @ViewChild('saveProfileButton') saveProfileButton: ButtonLoaderComponent; public saveProfileButtonConfig: ButtonConfig = { isBlue: true }
  /* Global variables ---------- */

  //Store data
  public store: StoreAdvancedView;

  //Final Result
  public editProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required]),
    ownerName: new FormControl('', [Validators.required]),
    ownerEmail: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categories: new FormControl([], []),
    backgroundImage: new FormControl(null, []),
    profileImage: new FormControl(null, [])
  });

  public backgroundImage: string = '';
  public profileImage: string = '';
  public categories: BasicCategoryView[] = [];
  public categoryFormControl = new FormControl(null, []);

  constructor(private dialogRef: MatDialogRef<EditStoreComponent>,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.readCategories().then(() => {
      this.readProfile();
    });
  }

  private readProfile(){
    this.globalService.getStore(null).subscribe((response: any) => {
      if(!response.error){
        this.store = response;
        this.setValue('name', this.store.name);
        this.setValue('email', this.store.email);
        this.setValue('website', this.store.website);
        this.setValue('phone', this.store.phone);
        this.setValue('description', this.store.description);
        this.setValue('ownerName', this.store.ownerName);
        this.setValue('ownerEmail', this.store.ownerEmail);

        this.backgroundImage = this.fileBaseUrl+this.store.backgroundImage;
        this.profileImage = this.fileBaseUrl+this.store.profileImage;
        this.store.categories.forEach((value: string) => {
          let category = this.categories.find((category) => category.value == value);
          this.setValueList('categories', {id: category.id, value: category.value}, false, false);
        });
      }
    })
  }

  private async readCategories(){
    this.globalService.getCategories().subscribe((response: any) => {
      if(!response.error){
        this.categories = response;
      }
    });
  }

  public setValue(formControlName: string, value: any){
    this.editProfileForm.get(formControlName).setValue(value);
  }
  public setValueList(formControlName: string, value: any, includeDeletion: boolean = true, searchFilter: any = null) {
    if (value) {
      this.globalService.checkExistancy(this.editProfileForm.get(formControlName).value, searchFilter ? searchFilter : { id: value.id }, (exist: boolean, index: number) => {
        if (exist) {
          if (includeDeletion) this.editProfileForm.get(formControlName).value.splice(index, 1);
        } else {
          this.editProfileForm.get(formControlName).value.push(value);
        }
      });
    }
    this.categoryFormControl.setValue(null)
  }
  public onChipDelete(formControlName: string, index: number){
    this.editProfileForm.get(formControlName).value.splice(index, 1);
  }

  public closeEditProfile() {
    this.dialogRef.close();
  }

  public saveProfile() {
    let updateProfileForm: UpdateProfileForm = {
      updateStoreForm: {}
    }

    /*
    this.globalService.updateProfile(updateProfileForm).subscribe((response: any) => {
      if (!response.error) {
        response['message']='Profile updated successfully'
        if(this.selectedProfileImageFile){
          //Update profile image
          let formData = new FormData();
          formData.append('File', this.selectedProfileImageFile);
          this.globalService.uploadProfileImage(formData).subscribe((response: any) => {
            if (!response.error) {
              this.setValue('profileImage', this.fileBaseUrl + response.profileImage)

              this.saveProfileButton.loading = false;
              this.dialogRef.close(response);
            }
          });
        }else{
          this.saveProfileButton.loading = false;
          this.dialogRef.close(response);
        }
      }
    });
    */
  }
}

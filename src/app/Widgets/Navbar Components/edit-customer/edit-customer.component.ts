import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

//Environments
import { environment } from 'src/environments/environments';

//Config
import { ButtonConfig } from '../../Button Components/button-loader/ButtonConfig.form';

//Components
import { ButtonLoaderComponent } from '../../Button Components/button-loader/button-loader.component';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Forms
import { UpdateProfileForm } from './../../../Shared/Models/Forms/UpdateProfileForm.form';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  public fileBaseUrl: string = environment.fileBaseUrl;

  @ViewChild('saveProfileButton') saveProfileButton: ButtonLoaderComponent; public saveProfileButtonConfig: ButtonConfig = { isBlue: true }

  public editProfileForm: FormGroup = new FormGroup({
    profileImage: new FormControl('', []),
    firstname: new FormControl('', []),
    lastname: new FormControl('', []),
    username: new FormControl('', []),
    email: new FormControl('', []),
    phone: new FormControl('', []),
    onItem: new FormControl(false, []),
    onOrder: new FormControl(false, [])
  });

  constructor(private dialogRef: MatDialogRef<EditCustomerComponent>,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.readCustomerProfile();
  }

  private readCustomerProfile() {
    this.globalService.getProfile().subscribe((response: any) => {
      if (!response.error) {
        for (let key of Object.keys(response)) {
          this.setValue(key, key == 'profileImage' ? this.fileBaseUrl + response[key] : response[key]);
        }
      }
    });
  }

  public selectedProfileImageFile: any = null;
  public onProfileImage(event: any) {
    let file = event.target.files[0];
    this.selectedProfileImageFile = file;

    const reader = new FileReader();
    reader.onload = (event) => {
      let fileBlob = event.target.result;
      this.setValue('profileImage', fileBlob);
    };
    reader.readAsDataURL(file);

  }

  public setValue(formControlName: string, value: any) {
    this.editProfileForm.get(formControlName).setValue(value);
  }

  public closeEditProfile() {
    this.dialogRef.close();
  }
  public saveProfile() {
    let updateProfileForm: UpdateProfileForm = {
      updateCustomerForm: {
        firstname: this.editProfileForm.get('firstname').value,
        lastname: this.editProfileForm.get('lastname').value,
        email: this.editProfileForm.get('email').value,
        phone: this.editProfileForm.get('phone').value,
        username: this.editProfileForm.get('username').value,
        onItem: this.editProfileForm.get('onItem').value,
        onOrder: this.editProfileForm.get('onOrder').value
      }
    }

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
  }
}

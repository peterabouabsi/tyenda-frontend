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

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  public fileBaseUrl: string = environment.fileBaseUrl;

  @ViewChild('saveProfileButton') saveProfileButton: ButtonLoaderComponent; public saveProfileButtonConfig: ButtonConfig = {isBlue: true}

  public editProfileForm: FormGroup = new FormGroup({
    accountId: new FormControl('', []),
    customerId: new FormControl('', []),
    profileImage: new FormControl('', []),
    firstname: new FormControl('', []),
    lastname: new FormControl('', []),
    username: new FormControl('', []),
    email: new FormControl('', []),
    phone: new FormControl('', [])
  });

  constructor(private dialogRef: MatDialogRef<EditCustomerComponent>,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.readCustomerProfile();
  }

  private readCustomerProfile(){
    this.globalService.getProfile().subscribe((response: any) => {
      if(!response.error){
        for(let key of Object.keys(response)){
          this.setValue(key, response[key]? response[key] : '');
        }
      }
    });
  }

  public onProfileImage(event: any) {
    let file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      let fileBlob = event.target.result;
      this.setValue('profileImage', fileBlob);
    };
    reader.readAsDataURL(file);
  }

  public setValue(formControlName: string, value: any){
    this.editProfileForm.get(formControlName).setValue(value);
  }

  public closeEditProfile(){
    this.dialogRef.close();
  }
  public saveProfile(){
    this.saveProfileButton.onClick(() => {
    });
  }
}

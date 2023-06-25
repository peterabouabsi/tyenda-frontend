import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//Config
import { ButtonConfig } from '../../Button Components/button-loader/ButtonConfig.form';

//Components
import { ButtonLoaderComponent } from '../../Button Components/button-loader/button-loader.component';

//Forms
import { ChangePasswordForm } from 'src/app/Shared/Models/Forms/ChangePasswordForm.form';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit{

  public changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword : new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  public buttonConfig: ButtonConfig = {isBlue: true, disabled: this.changePasswordForm.invalid}

  constructor(private dialogRef: MatDialogRef<ChangePwdComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
  }

  public setValue(formControlName: string, value: string){
    this.changePasswordForm.get(formControlName).setValue(value);
    this.buttonConfig.disabled = this.changePasswordForm.invalid
  }

  @ViewChild('changePwdButton') changePwdButton: ButtonLoaderComponent;
  public errorMessage: string = "";
  @HostListener('document: keyup.enter')
  public changePassword(){
    this.changePwdButton.onClick(() => {
      if(this.changePasswordForm.valid){
        let changePasswordForm: ChangePasswordForm = {
          oldPassword: this.changePasswordForm.get('oldPassword').value,
          newPassword: this.changePasswordForm.get('newPassword').value,
          confirmPassword: this.changePasswordForm.get('confirmPassword').value
        }

        this.globalService.changePassword(changePasswordForm).subscribe((response: any) => {
          this.changePwdButton.loading = false;
          if(response.error){
            this.errorMessage = response.message;
          }else{
            this.dialogRef.close(response);
          }
        }, (err: any) => {
          this.changePwdButton.loading = false;
        });
      }
    });
  }
}

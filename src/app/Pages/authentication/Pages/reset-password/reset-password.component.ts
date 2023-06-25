import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//Config
import { ButtonConfig } from 'src/app/Widgets/Button Components/button-loader/ButtonConfig.form';

//Components
import { ButtonLoaderComponent } from 'src/app/Widgets/Button Components/button-loader/button-loader.component';
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';

//Forms
import { ResetPasswordForm } from './../../../../Shared/Models/Forms/ResetPasswordForm.form';

//Services
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;
  public buttonConfig: ButtonConfig = {isBlue: true}

  public resetPasswordForm: FormGroup = new FormGroup({
    token: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getUrlToken();
  }

  public getUrlToken(){
    let token = this.route.snapshot.queryParams['token'];
    if(token){
      this.setValue('token', token);
    }else{
      this.router.navigate(['/authentication/login']);
    }
  }

  public setValue(formControlName: string, value: string){
    this.resetPasswordForm.get(formControlName).setValue(value);
  }

  @ViewChild('resetPasswordButton') resetPasswordButton: ButtonLoaderComponent;
  @HostListener('document: keyup.enter')
  public resetPassword(){
    this.resetPasswordButton.onClick(() => {
      if(this.resetPasswordForm.valid){

        let resetPasswordForm: ResetPasswordForm = {
          newPassword: this.resetPasswordForm.get('password').value,
          confirmPassword: this.resetPasswordForm.get('confirmPassword').value,
          token: this.resetPasswordForm.get('token').value
        };

        this.authenticationService.resetPassword(resetPasswordForm).subscribe((response: any) => {
          this.resetPasswordButton.loading = false;
          if(response.error){
            this.toastrRef.onDanger('Reset Password', response.message, 5);
          }else{
            this.router.navigate(['/authentication/login']);
          }
        });

      }else{
        this.markFormAsDirty();
        this.resetPasswordButton.loading = false;
      }
    });
  }

  public markFormAsDirty() {
    Object.keys(this.resetPasswordForm.getRawValue()).forEach(formControlName => {
      this.resetPasswordForm.get(formControlName).markAsDirty();
    });
  }
}

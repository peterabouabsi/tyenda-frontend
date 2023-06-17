import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Config
import { ButtonConfig } from 'src/app/Widgets/Button Components/button/ButtonConfig.form';

//Components
import { ButtonComponent } from 'src/app/Widgets/Button Components/button/button.component';
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';

//Services
import { AuthenticationService } from '../../Services/authentication.service';

//Forms
import { ForgetPasswordForm } from 'src/app/Shared/Models/Forms/ForgetPasswordForm.form';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;
  public buttonConfig: ButtonConfig = {isBlue: true};

  public forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  public setValue(formControlName: string, value: string) {
    this.forgetPasswordForm.get(formControlName).setValue(value);
  }

  @ViewChild('sendEmailButton') sendEmailButton: ButtonComponent;
  @HostListener('document: keyup.enter')
  public send() {
    this.sendEmailButton.onClick(() => {
      if (this.forgetPasswordForm.valid) {
        let forgetPasswordForm: ForgetPasswordForm = {
          email: this.forgetPasswordForm.get('email').value
        };
        this.authenticationService.forgetPassword(forgetPasswordForm).subscribe((response: any) => {
          this.sendEmailButton.loading = false;
          if(response.error){
            this.toastrRef.onDanger('Forget Password', response.message, 5);
          }else{
            this.router.navigate(['/authentication/login']);
          }
        });
      } else {
        this.sendEmailButton.loading = false;
        this.markFormAsDirty();
      }
    });
  }

  public markFormAsDirty() {
    Object.keys(this.forgetPasswordForm.getRawValue()).forEach(formControlName => {
      this.forgetPasswordForm.get(formControlName).markAsDirty();
    });
  }

  public backToLogin() {
    this.router.navigate(['/authentication/login'])
  }
}

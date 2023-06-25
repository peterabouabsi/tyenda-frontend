import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Config
import { ButtonConfig } from 'src/app/Widgets/Button Components/button-loader/ButtonConfig.form';

//Components
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';
import { ButtonLoaderComponent } from 'src/app/Widgets/Button Components/button-loader/button-loader.component';

//Forms
import { CustomerSignupForm } from './../../../../Shared/Models/Forms/CustomerSignupForm.form';

//Services
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.scss']
})
export class CustomerSignupComponent implements OnInit{

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;
  public buttonConfig: ButtonConfig = {isBlue: true};

  public signupForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  public setValue(formControlName: string, value: string){
    this.signupForm.get(formControlName).setValue(value);
  }

  @ViewChild('signupButton') signupButton: ButtonLoaderComponent;
  @HostListener('document: keyup.enter')
  public signup(){
    this.signupButton.onClick(() => {
      if(this.signupForm.valid){

        let customerSignupForm: CustomerSignupForm = {
          firstname: this.signupForm.get('firstname').value,
          lastname: this.signupForm.get('lastname').value,
          username: this.signupForm.get('username').value,
          password: this.signupForm.get('password').value,
          email: this.signupForm.get('email').value,
          phoneNumber: this.signupForm.get('phoneNumber').value
        }

        this.authenticationService.signup('/Account/Customer/Signup()', customerSignupForm).subscribe((response: any) => {
          setTimeout(() => {this.signupButton.loading = false}, 1500);
          if(response.error){
            this.toastrRef.onDanger('Signup', response.message, 5);
          }else{
            this.router.navigate(['/authentication/email-activation'], {queryParams: {email: customerSignupForm.email}});
          }
        });

      }else{
        this.markFormAsDirty();
        this.signupButton.loading = false;
      }
    });
  }

  public markFormAsDirty() {
    Object.keys(this.signupForm.getRawValue()).forEach(formControlName => {
      this.signupForm.get(formControlName).markAsDirty();
    });
  }

  public login(){
    this.router.navigate(['/authentication/login']);
  }

}

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Config
import { ButtonConfig } from 'src/app/Widgets/Button Components/button/ButtonConfig.form';

//Components
import { ButtonComponent } from 'src/app/Widgets/Button Components/button/button.component';
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';

//Forms
import { LoginForm } from 'src/app/Shared/Models/Forms/LoginForm.form';

//Services
import { GlobalService } from './../../../../Shared/Services/Global/global.service';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;
  public buttonConfig: ButtonConfig = {isBlue: true};

  public loginForm: FormGroup = new FormGroup({
    usernameEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
              private globalService: GlobalService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  public setValue(controleName: string, value: string){
    this.loginForm.get(controleName).setValue(value);
  }

  @ViewChild('loginButton') loginButton: ButtonComponent;
  @HostListener('document: keyup.enter')
  public login(){
    this.loginButton.onClick(() => {
      if(this.loginForm.valid){

        let loginFrom: LoginForm = {
          usernameOrEmail: this.loginForm.get('usernameEmail').value,
          password: this.loginForm.get('password').value
        }

        this.authenticationService.login(loginFrom).subscribe((response: any) => {
          setTimeout(() => {this.loginButton.loading = false}, 1500);

          if(response.error){
            this.toastrRef.onDanger('Login', response.message, 5);
          }else{
            //This means you received your tokens and ready to move on
            if(response.isActive == undefined){
              this.globalService.setStorage(Constants.STORAGE_SESSION, response);
              this.globalService.getAccountRole().subscribe((response: any) => {
                if(!response.error){
                  if(response.role == Constants.ROLE_CUSTOMER) this.router.navigate(['/application/customer']);
                  if(response.role == Constants.ROLE_STORE) this.router.navigate(['/application/store']);
                }
              });
            //This means the account is not activated yet
            }else{
              this.router.navigate(['/authentication/email-activation'], {queryParams: {email: response.email}});
            }
          }
        });

      }else{
        this.loginButton.loading = false;
        this.markFormAsDirty();
      }
    });
  }

  public markFormAsDirty() {
    Object.keys(this.loginForm.getRawValue()).forEach(formControlName => {
      this.loginForm.get(formControlName).markAsDirty();
    });
  }

  public forgetPassword(){
    this.router.navigate(['/authentication/forget-password']);
  }
  public signup(path: string){
    this.router.navigate(['/authentication/signup/'+path]);
  }
}

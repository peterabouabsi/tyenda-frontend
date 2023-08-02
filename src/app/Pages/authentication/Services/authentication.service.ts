import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

//Forms
import { LoginForm } from 'src/app/Shared/Models/Forms/LoginForm.form';
import { ForgetPasswordForm } from 'src/app/Shared/Models/Forms/ForgetPasswordForm.form';
import { ResetPasswordForm } from 'src/app/Shared/Models/Forms/ResetPasswordForm.form';
import { StoreSignupForm } from 'src/app/Shared/Models/Forms/StoreSignupForm.form';
import { CustomerSignupForm } from 'src/app/Shared/Models/Forms/CustomerSignupForm.form';
import { SendActivationEmailForm } from 'src/app/Shared/Models/Forms/SendActivationEmailForm.form';
import { ActivateAccountForm } from 'src/app/Shared/Models/Forms/ActivateAccountForm.form';
import { RefreshTokenForm } from '../../../Shared/Models/Forms/RefreshTokenForm.form';
import { LoginGoogleForm } from './../../../Shared/Models/Forms/LoginGoogleForm.form';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: ApiService) { }

  public login(loginForm: LoginForm){
    return this.apiService.post('/Account/Login()', loginForm);
  }

  public loginWithGoogle(form: LoginGoogleForm) {
    return this.apiService.post("/Account/LoginGoogle()", form);
  }

  public forgetPassword(forgetPasswordForm: ForgetPasswordForm){
    return this.apiService.post('/Account/ForgetPassword()', forgetPasswordForm);
  }

  public resetPassword(resetPasswordForm: ResetPasswordForm){
    return this.apiService.post('/Account/ResetPassword()', resetPasswordForm);
  }

  public signup(endpoint: string, signupForm: StoreSignupForm | CustomerSignupForm){
    return this.apiService.post(endpoint, signupForm);
  }

  public sendActivationEmail(sendActivationEmailForm: SendActivationEmailForm){
    return this.apiService.post('/Account/SendActivationEmail()', sendActivationEmailForm);
  }

  public activateAccount(activateAccountForm: ActivateAccountForm){
    return this.apiService.post('/Account/Activate()', activateAccountForm);
  }

  public refreshToken(refreshTokenForm: RefreshTokenForm){
    return this.apiService.post('/Account/RefreshToken()', refreshTokenForm);
  }

}

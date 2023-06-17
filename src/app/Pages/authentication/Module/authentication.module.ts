//Modules
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/Modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/Shared/Modules/angular-material/angular-material.module';

//Parent Components
import { AuthMainComponent } from '../Pages/auth-main.component';

//Children Components
import { LoginComponent } from '../Pages/login/login.component';
import { ForgetPasswordComponent } from '../Pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../Pages/reset-password/reset-password.component';
import { EmailVerificationComponent } from '../Pages/email-verification/email-verification.component';
import { EmailActivationComponent } from '../Pages/email-activation/email-activation.component';
import { CustomerSignupComponent } from '../Pages/customer-signup/customer-signup.component';
import { StoreSignupComponent } from '../Pages/store-signup/store-signup.component';
  import { AccountInfoComponent } from '../Pages/store-signup/Stepper Components/account-info/account-info.component';
  import { StoreInfoComponent } from '../Pages/store-signup/Stepper Components/store-info/store-info.component';
  import { StoreBranchComponent } from '../Pages/store-signup/Stepper Components/store-branch/store-branch.component';
  import { StoreCategoryComponent } from '../Pages/store-signup/Stepper Components/store-category/store-category.component';

//Services
import { AuthenticationService } from '../Services/authentication.service';

@NgModule({
  declarations: [
    //Parent Component
    AuthMainComponent,

    //Children Components
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    EmailActivationComponent,
    EmailVerificationComponent,
    CustomerSignupComponent,
    StoreSignupComponent,
      AccountInfoComponent,
      StoreInfoComponent,
      StoreBranchComponent,
      StoreCategoryComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    //Parent Component
    AuthMainComponent,

    //Children Components
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    EmailActivationComponent,
    EmailVerificationComponent,
    CustomerSignupComponent,
    StoreSignupComponent,
    AccountInfoComponent,
    StoreInfoComponent,
    StoreBranchComponent,
    StoreCategoryComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }

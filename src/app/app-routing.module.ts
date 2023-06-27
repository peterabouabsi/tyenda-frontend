import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Constants
import { Constants } from './Shared/Models/constants.model';

//Pages
import { SplashComponent } from './Pages/splash/splash.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';

import { AuthMainComponent } from './Pages/authentication/Pages/auth-main.component';
  import { LoginComponent } from './Pages/authentication/Pages/login/login.component';
  import { ForgetPasswordComponent } from './Pages/authentication/Pages/forget-password/forget-password.component';
  import { ResetPasswordComponent } from './Pages/authentication/Pages/reset-password/reset-password.component';
  import { EmailActivationComponent } from './Pages/authentication/Pages/email-activation/email-activation.component';
  import { EmailVerificationComponent } from './Pages/authentication/Pages/email-verification/email-verification.component';
  import { CustomerSignupComponent } from './Pages/authentication/Pages/customer-signup/customer-signup.component';
  import { StoreSignupComponent } from './Pages/authentication/Pages/store-signup/store-signup.component';
    import { AccountInfoComponent } from './Pages/authentication/Pages/store-signup/Stepper Components/account-info/account-info.component';
    import { StoreInfoComponent } from './Pages/authentication/Pages/store-signup/Stepper Components/store-info/store-info.component';
    import { StoreBranchComponent } from './Pages/authentication/Pages/store-signup/Stepper Components/store-branch/store-branch.component';
    import { StoreCategoryComponent } from './Pages/authentication/Pages/store-signup/Stepper Components/store-category/store-category.component';

import { ApplicationComponent } from './Pages/application/Pages/application.component';
  import { CustomerMainComponent } from './Pages/application/Pages/Customer/customer-main.component';
    import { HomeCustomerComponent } from './Pages/application/Pages/Customer/Pages/Home/home-customer.component';
    import { SearchComponent } from './Pages/application/Pages/Customer/Pages/Search/search.component';
    import { OrdersCustomerComponent } from './Pages/application/Pages/Customer/Pages/Orders/orders-customer.component';

  import { StoreMainComponent } from './Pages/application/Pages/Store/store-main.component';
    //

//Guards
import { authenticationGuard } from './Shared/Guards/Authentication/authentication.guard';
import { roleBasedAuthenticationGuard } from './Shared/Guards/Role-Based Authentication/role-based-authentication.guard';

const routes: Routes = [
  {path:'', component: SplashComponent},
  {path: 'authentication', component: AuthMainComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', title: 'Tyenda | Login', component: LoginComponent},
    {path: 'forget-password', title: 'Tyenda | Forget password', component: ForgetPasswordComponent},
    {path: 'reset-password', title: 'Tyenda | Reset password', component: ResetPasswordComponent},
    {path: 'email-activation', title: 'Tyenda | email activation', component: EmailActivationComponent},
    {path: 'email-verification', title: 'Tyenda | email verification', component: EmailVerificationComponent},
    {path: 'signup/customer', title: 'Tyenda | Signup Customer', component: CustomerSignupComponent},
    {path: 'signup/store', title: 'Tyenda | Signup Store', component: StoreSignupComponent, children: [
      {path: '', redirectTo: 'account-info', pathMatch: 'full'},
      {path: 'account-info', component: AccountInfoComponent},
      {path: 'store-info', component: StoreInfoComponent},
      {path: 'store-branch', component: StoreBranchComponent},
      {path: 'store-category', component: StoreCategoryComponent}
    ]}
  ]},
  {path: 'application', component: ApplicationComponent, canActivateChild: [authenticationGuard], children: [
    {path: 'customer', component: CustomerMainComponent, data: {roles: [Constants.ROLE_CUSTOMER]}, canActivate: [roleBasedAuthenticationGuard], children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeCustomerComponent, title: 'Tyenda | Home'},
      {path: 'search', component: SearchComponent, title: 'Tyenda | Search'},
      {path: 'orders', component: OrdersCustomerComponent, title: 'Tyenda | Orders'}
      /*
      {path: 'folders', component: null, title: 'Tyenda | Folders'}
      */
    ]},
    {path: 'store', component: StoreMainComponent, data: {roles: [Constants.ROLE_STORE]}, canActivate: [roleBasedAuthenticationGuard], children: [

    ]}
  ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

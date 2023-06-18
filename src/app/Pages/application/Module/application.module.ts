//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/Shared/Modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/Shared/Modules/shared/shared.module';

//Components
import { ApplicationComponent } from '../Pages/application.component';
import { CustomerMainComponent } from '../Pages/Customer/customer-main.component';
  import { NavbarCustomerComponent } from 'src/app/Widgets/Navbar Components/navbar-customer/navbar-customer.component';
  import { HomeCustomerComponent } from '../Pages/Customer/Pages/Home/home-customer/home-customer.component';

import { StoreMainComponent } from '../Pages/Store/store-main.component';
  import { NavbarStoreComponent } from 'src/app/Widgets/Navbar Components/navbar-store/navbar-store.component';
  //

@NgModule({
  declarations: [
    ApplicationComponent,

    CustomerMainComponent,
    //Navbar
    NavbarCustomerComponent,
    //Customer Pages
    HomeCustomerComponent,


    StoreMainComponent,
    //Navbar
    NavbarStoreComponent,
    //Store Pages

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    ApplicationComponent,

    CustomerMainComponent,
    //Navbar
    NavbarCustomerComponent,
    //Customer Pages
    HomeCustomerComponent,


    StoreMainComponent,
    //Navbar
    NavbarStoreComponent,
    //Store Pages
  ],
  providers: []
})

export class ApplicationModule { }

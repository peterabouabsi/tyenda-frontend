//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/Shared/Modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/Shared/Modules/shared/shared.module';

//Components
import { ApplicationComponent } from '../Pages/application.component';
import { CustomerMainComponent } from '../Pages/Customer/customer-main.component';
  //
import { StoreMainComponent } from '../Pages/Store/store-main.component';
  //

@NgModule({
  declarations: [
    ApplicationComponent,

    CustomerMainComponent,
    //Customer Pages

    StoreMainComponent
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
    //Customer Pages

    StoreMainComponent
    //Store Pages

  ],
  providers: []
})

export class ApplicationModule { }

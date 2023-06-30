//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

//Services
import { StoreCardService } from 'src/app/Widgets/Store Components/Services/store-card.service';
import { ItemCardService } from 'src/app/Widgets/Item Components/Services/item-card.service';

//Pipes
import { TimestampPipe } from '../../Pipes/Timestamp/timestamp.pipe';

//Components
import { TextFieldComponent } from 'src/app/Widgets/Form Components/text-field/text-field.component';
import { SelectFieldComponent } from 'src/app/Widgets/Form Components/select-field/select-field.component';
import { TextAreaComponent } from 'src/app/Widgets/Form Components/text-area/text-area.component';
import { PasswordFieldComponent } from 'src/app/Widgets/Form Components/password-field/password-field.component';
import { SalaryRangeSelectComponent } from 'src/app/Widgets/Form Components/salary-range-select/salary-range-select.component';

import { ButtonLoaderComponent } from 'src/app/Widgets/Button Components/button-loader/button-loader.component';
import { ButtonComponent } from 'src/app/Widgets/Button Components/button/button.component';

import { SelectorChipComponent } from 'src/app/Widgets/Chips Components/selector-chip/selector-chip.component';
import { BadgeComponent } from 'src/app/Widgets/Chips Components/badge/badge.component';
import { AvatarComponent } from 'src/app/Widgets/Chips Components/avatar/avatar.component';
import { SelectMultiBoxComponent } from 'src/app/Widgets/Chips Components/select-multi-box/select-multi-box.component';

import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';
import { StepperComponent } from 'src/app/Widgets/Other Components/stepper/stepper.component';
import { PagerComponent } from 'src/app/Widgets/Other Components/pager/pager.component';
import { ExpansionPanelComponent } from 'src/app/Widgets/Other Components/expansion-panel/expansion-panel.component';

import { ItemCustomerBasicCardComponent } from 'src/app/Widgets/Item Components/item-customer-basic-card/item-customer-basic-card.component';
import { StoreCustomerModerateCardComponent } from 'src/app/Widgets/Store Components/store-customer-moderate-card/store-customer-moderate-card.component';
import { OrderCustomerCardComponent } from 'src/app/Widgets/Order Components/order-customer-card/order-customer-card.component';
import { OverviewCardComponent } from 'src/app/Widgets/Overview Components/overview-card/overview-card.component';
import { NotificationCardComponent } from 'src/app/Widgets/Notification Components/notification-card/notification-card.component';
import { EmptyComponent } from 'src/app/Widgets/Other Components/empty/empty.component';

@NgModule({
  declarations: [
    //Pipes
    TimestampPipe,

    //Components
    TextFieldComponent,
    TextAreaComponent,
    PasswordFieldComponent,
    SelectFieldComponent,
    SalaryRangeSelectComponent,

    ButtonLoaderComponent,
    ButtonComponent,

    SelectorChipComponent,
    AvatarComponent,
    BadgeComponent,
    SelectMultiBoxComponent,

    ToastrComponent,
    StepperComponent,
    PagerComponent,
    ExpansionPanelComponent,
    EmptyComponent,

    ItemCustomerBasicCardComponent,
    StoreCustomerModerateCardComponent,
    OrderCustomerCardComponent,
    OverviewCardComponent,
    NotificationCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports:[
    //Pipes
    TimestampPipe,

    //Components
    TextFieldComponent,
    TextAreaComponent,
    PasswordFieldComponent,
    SelectFieldComponent,
    SalaryRangeSelectComponent,

    ButtonLoaderComponent,
    ButtonComponent,

    SelectorChipComponent,
    AvatarComponent,
    BadgeComponent,
    SelectMultiBoxComponent,

    ToastrComponent,
    StepperComponent,
    PagerComponent,
    ExpansionPanelComponent,
    EmptyComponent,

    ItemCustomerBasicCardComponent,
    StoreCustomerModerateCardComponent,
    OrderCustomerCardComponent,
    OverviewCardComponent,
    NotificationCardComponent
  ],
  providers: [
    StoreCardService,
    ItemCardService
  ]
})
export class SharedModule { }

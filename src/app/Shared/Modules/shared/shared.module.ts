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
import { NumberFormatPipe } from '../../Pipes/Number/number-format.pipe';

//Components
import { TextFieldComponent } from 'src/app/Widgets/Form Components/text-field/text-field.component';
import { SelectFieldComponent } from 'src/app/Widgets/Form Components/select-field/select-field.component';
import { TextAreaComponent } from 'src/app/Widgets/Form Components/text-area/text-area.component';
import { PasswordFieldComponent } from 'src/app/Widgets/Form Components/password-field/password-field.component';
import { SalaryRangeSelectComponent } from 'src/app/Widgets/Form Components/salary-range-select/salary-range-select.component';
import { RateSelectorComponent } from 'src/app/Widgets/Form Components/rate-selector/rate-selector.component';
import { SingleCheckboxComponent } from './../../../Widgets/Form Components/single-checkbox/single-checkbox.component';
import { ToggleComponent } from 'src/app/Widgets/Form Components/toggle/toggle.component';

import { ButtonLoaderComponent } from 'src/app/Widgets/Button Components/button-loader/button-loader.component';
import { ButtonComponent } from 'src/app/Widgets/Button Components/button/button.component';
import { ButtonQuantityComponent } from 'src/app/Widgets/Button Components/button-quantity/button-quantity.component';

import { SelectorChipComponent } from 'src/app/Widgets/Chips Components/selector-chip/selector-chip.component';
import { BadgeComponent } from 'src/app/Widgets/Chips Components/badge/badge.component';
import { AvatarComponent } from 'src/app/Widgets/Chips Components/avatar/avatar.component';
import { SelectMultiBoxComponent } from 'src/app/Widgets/Chips Components/select-multi-box/select-multi-box.component';
import { ChipComponent } from 'src/app/Widgets/Chips Components/chip/chip.component';

import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';
import { StepperComponent } from 'src/app/Widgets/Other Components/stepper/stepper.component';
import { PagerComponent } from 'src/app/Widgets/Other Components/pager/pager.component';
import { ExpansionPanelComponent } from 'src/app/Widgets/Other Components/expansion-panel/expansion-panel.component';
import { EmptyComponent } from 'src/app/Widgets/Other Components/empty/empty.component';
import { OptionsBarComponent } from 'src/app/Widgets/Other Components/options-bar/options-bar.component';
import { SliderComponent } from 'src/app/Widgets/Other Components/slider/slider.component';
import { AlertComponent } from 'src/app/Widgets/Other Components/alert/alert.component';

import { ItemEntryCardComponent } from 'src/app/Widgets/Item Components/item-entry-card/item-entry-card.component';
import { ItemCustomerBasicCardComponent } from 'src/app/Widgets/Item Components/item-customer-basic-card/item-customer-basic-card.component';
import { ItemCustomerModerateCardComponent } from 'src/app/Widgets/Item Components/item-customer-moderate-card/item-customer-moderate-card.component';
import { StoreCustomerModerateCardComponent } from 'src/app/Widgets/Store Components/store-customer-moderate-card/store-customer-moderate-card.component';
import { StoreCustomerBasicCardComponent } from 'src/app/Widgets/Store Components/store-customer-basic-card/store-customer-basic-card.component';
import { OrderCustomerCardComponent } from 'src/app/Widgets/Order Components/order-customer-card/order-customer-card.component';
import { OverviewCardComponent } from 'src/app/Widgets/Overview Components/overview-card/overview-card.component';
import { NotificationCardComponent } from 'src/app/Widgets/Notification Components/notification-card/notification-card.component';

import { CommentCardComponent } from 'src/app/Widgets/Comment Components/comment-card/comment-card.component';

import { VideoComponent } from 'src/app/Widgets/Video Components/video/video.component';

import { MapViewComponent } from './../../../Widgets/Map Components/map-view/map-view.component';
import { MapComponent } from 'src/app/Widgets/Map Components/map/map.component';

//Directives
import { RolePermissionDirective } from '../../Directives/role-permission.directive';


@NgModule({
  declarations: [
    //Pipes
    TimestampPipe,
    NumberFormatPipe,

    //Components
    TextFieldComponent,
    TextAreaComponent,
    PasswordFieldComponent,
    SelectFieldComponent,
    SalaryRangeSelectComponent,
    RateSelectorComponent,
    SingleCheckboxComponent,
    ToggleComponent,

    ButtonLoaderComponent,
    ButtonComponent,
    ButtonQuantityComponent,

    SelectorChipComponent,
    AvatarComponent,
    BadgeComponent,
    SelectMultiBoxComponent,
    ChipComponent,

    ToastrComponent,
    StepperComponent,
    PagerComponent,
    ExpansionPanelComponent,
    EmptyComponent,
    OptionsBarComponent,
    SliderComponent,
    AlertComponent,

    ItemEntryCardComponent,
    ItemCustomerBasicCardComponent,
    ItemCustomerModerateCardComponent,
    StoreCustomerModerateCardComponent,
    StoreCustomerBasicCardComponent,
    OrderCustomerCardComponent,
    OverviewCardComponent,
    NotificationCardComponent,
    CommentCardComponent,

    VideoComponent,

    MapViewComponent,
    MapComponent,

    //Directives
    RolePermissionDirective
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
    NumberFormatPipe,

    //Components
    TextFieldComponent,
    TextAreaComponent,
    PasswordFieldComponent,
    SelectFieldComponent,
    SalaryRangeSelectComponent,
    RateSelectorComponent,
    SingleCheckboxComponent,
    ToggleComponent,

    ButtonLoaderComponent,
    ButtonComponent,
    ButtonQuantityComponent,

    SelectorChipComponent,
    AvatarComponent,
    BadgeComponent,
    SelectMultiBoxComponent,
    ChipComponent,

    ToastrComponent,
    StepperComponent,
    PagerComponent,
    ExpansionPanelComponent,
    EmptyComponent,
    OptionsBarComponent,
    SliderComponent,

    ItemEntryCardComponent,
    ItemCustomerBasicCardComponent,
    ItemCustomerModerateCardComponent,
    StoreCustomerModerateCardComponent,
    StoreCustomerBasicCardComponent,
    OrderCustomerCardComponent,
    OverviewCardComponent,
    NotificationCardComponent,
    CommentCardComponent,

    VideoComponent,

    MapViewComponent,
    MapComponent,

    //Directives
    RolePermissionDirective
  ],
  providers: [
    StoreCardService,
    ItemCardService
  ]
})
export class SharedModule { }

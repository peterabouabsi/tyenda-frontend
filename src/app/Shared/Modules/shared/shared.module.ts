//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

//Components
import { TextFieldComponent } from 'src/app/Widgets/Form Components/text-field/text-field.component';
import { SelectFieldComponent } from 'src/app/Widgets/Form Components/select-field/select-field.component';
import { TextAreaComponent } from 'src/app/Widgets/Form Components/text-area/text-area.component';
import { PasswordFieldComponent } from 'src/app/Widgets/Form Components/password-field/password-field.component';
import { ButtonComponent } from 'src/app/Widgets/Button Components/button/button.component';
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';
import { StepperComponent } from 'src/app/Widgets/Other Components/stepper/stepper.component';
import { SelectorChipComponent } from 'src/app/Widgets/Chips Components/selector-chip/selector-chip.component';
import { AvatarComponent } from 'src/app/Widgets/Chips Components/avatar/avatar.component';
import { BadgeComponent } from 'src/app/Widgets/Chips Components/badge/badge.component';

@NgModule({
  declarations: [
    //Components
    TextFieldComponent,
    TextAreaComponent,
    PasswordFieldComponent,
    ButtonComponent,
    ToastrComponent,
    StepperComponent,
    SelectFieldComponent,
    SelectorChipComponent,
    AvatarComponent,
    BadgeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports:[
    //Components
    TextFieldComponent,
    TextAreaComponent,
    PasswordFieldComponent,
    ButtonComponent,
    ToastrComponent,
    StepperComponent,
    SelectFieldComponent,
    SelectorChipComponent,
    AvatarComponent,
    BadgeComponent
  ]
})
export class SharedModule { }

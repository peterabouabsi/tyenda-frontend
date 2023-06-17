import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Materials
import { MatIconModule } from '@angular/material/icon';

const AngularMaterialModules = [
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModules
  ],
  exports:[
    AngularMaterialModules
  ]
})
export class AngularMaterialModule { }

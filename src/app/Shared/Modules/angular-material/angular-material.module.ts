import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Materials
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const AngularMaterialModules = [
  MatIconModule,
  MatDialogModule
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

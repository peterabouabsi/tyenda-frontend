import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//Components
import { ButtonLoaderComponent } from '../../Button Components/button-loader/button-loader.component';

//Config
import { ButtonConfig } from '../../Button Components/button-loader/ButtonConfig.form';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{

  @ViewChild('requestOrderButton') requestOrderButtonRef: ButtonLoaderComponent;
  public requestOrderButtonConfig: ButtonConfig = {isBlue: true};

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertConfig,
              public dialogRef: MatDialogRef<AlertComponent>) {
  }

  ngOnInit(): void {
  }

}

export interface AlertConfig {
  title: string;
  message: string;
  buttons: AlertButtonConfig[]
}

export interface AlertButtonConfig {
  value: string;
  color: string;
  isLoaderButton?: boolean;
  onButtonClick: (dialogRef?: MatDialogRef<AlertComponent>) => void;
}

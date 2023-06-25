import { Component, Input, OnInit } from '@angular/core';

//Config
import { ButtonConfig } from './ButtonConfig.form';

@Component({
  selector: 'app-button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.scss']
})
export class ButtonLoaderComponent implements OnInit{

  @Input() value: string = '';
  @Input() config: ButtonConfig = {isBlue: false, isWhite: false, isStepper: false, disabled: false};

  constructor() {
  }

  ngOnInit(): void {
  }

  public loading: boolean = false;
  public onClick(callback = () => {}){
    if(!this.config.isStepper && !this.config.disabled){
      this.loading = true;
    }
    callback();
  }
}

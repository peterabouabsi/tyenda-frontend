import { Component, Input, OnInit } from '@angular/core';

//Config
import { ButtonConfig } from './ButtonConfig.form';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{

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

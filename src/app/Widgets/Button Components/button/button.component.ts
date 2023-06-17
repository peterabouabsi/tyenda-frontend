import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Config
import { ButtonConfig } from './ButtonConfig.form';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{

  @Input() value: string = '';
  @Input() config: ButtonConfig = {isBlue: false, isWhite: false, isStepper: false};

  @Output() onClickEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public loading: boolean = false;
  public onClick(callback = () => {}){
    if(!this.config.isStepper){
      this.loading = true;
    }
    callback();
  }
}

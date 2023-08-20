import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent implements OnInit {

  @Input() min?: number = 0;
  @Input() max?: number = 999999999999;
  @Input() setClickEvent?: boolean = false;
  @Input() formControl: any = null;
  @Input() disabled?: boolean = false;

  @Output() onInputEvent = new EventEmitter();
  @Output() onClickEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onInput(event: any) {
    if (Number(event.target.value) > this.max) event.target.value = this.max;
    this.formControl.markAsDirty();
    if(this.setClickEvent) this.formControl.setValue(Number(event.target.value))
    if(!this.setClickEvent) this.onInputEvent.emit(Number(event.target.value));
  }
  onClick() {
    this.onClickEvent.emit(Number(this.formControl.value));
  }
}


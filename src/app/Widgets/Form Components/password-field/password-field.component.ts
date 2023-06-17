import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit{

  @Input() placeholder: string = '';
  @Input() formControl: any = null;

  @Output() onInputEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onInput(event: any){
    this.formControl.markAsDirty();
    this.onInputEvent.emit(event.target.value);
  }
}

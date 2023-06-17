import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit{

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

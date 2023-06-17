import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit{

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

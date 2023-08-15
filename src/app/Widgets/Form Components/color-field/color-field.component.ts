import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-field',
  templateUrl: './color-field.component.html',
  styleUrls: ['./color-field.component.scss']
})
export class ColorFieldComponent implements OnInit{

  @Input() color: string = '';
  @Input() formControl: any;
  @Output() onInputEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onInput(event: any){
    let color = event.target.value;

    if(!color.startsWith('#')) this.color = '#'+color;
    else this.color = color;

    if(this.color.length == 7) this.onInputEvent.emit(this.color);
  }

}

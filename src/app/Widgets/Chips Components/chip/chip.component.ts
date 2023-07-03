import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit{

  @Input() icon?: string = '';
  @Input() value: string = '';
  @Input() color: string = '';

  @Output() onClickEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onClick(){
    this.onClickEvent.emit()
  }

}

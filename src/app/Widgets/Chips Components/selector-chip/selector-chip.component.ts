import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector-chip',
  templateUrl: './selector-chip.component.html',
  styleUrls: ['./selector-chip.component.scss']
})
export class SelectorChipComponent implements OnInit{

  @Input() data: any = {};

  @Output() onDelete = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public remove(){
    this.onDelete.emit();
  }

}

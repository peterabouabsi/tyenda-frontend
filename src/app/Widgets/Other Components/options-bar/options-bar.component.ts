import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss']
})
export class OptionsBarComponent implements OnInit{

  @Input() options: string[] = [];
  @Input() activeIndex: number = 1;

  @Output() onSelectEvent = new EventEmitter();

  ngOnInit(): void {
  }

  public onClick(index: number){
    this.activeIndex = index;
    this.onSelectEvent.emit(index);
  }

}

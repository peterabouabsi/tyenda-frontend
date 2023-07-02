import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-selector',
  templateUrl: './rate-selector.component.html',
  styleUrls: ['./rate-selector.component.scss']
})
export class RateSelectorComponent implements OnInit{

  public rates: number[] = [1,2,3,4,5];

  @Input() value: number = 0;
  @Input() onRateEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onRate(rate: number){
    this.onRateEvent.emit(rate);
  }
}

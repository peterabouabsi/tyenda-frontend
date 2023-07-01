import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-quantity',
  templateUrl: './button-quantity.component.html',
  styleUrls: ['./button-quantity.component.scss']
})
export class ButtonQuantityComponent implements OnInit{

  @Input() quantity: number = 0;
  @Input() maxQuantity: number;
  @Output() onCounterClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public countClick(counter: number){
    if(counter == 0 && this.quantity - 1 > 0) this.quantity -= 1;
    if(counter == 1 && this.quantity + 1 <= this.maxQuantity) this.quantity += 1;
    this.onCounterClick.emit(this.quantity);
  }

}

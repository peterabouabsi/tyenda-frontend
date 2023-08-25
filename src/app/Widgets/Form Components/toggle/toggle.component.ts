import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit{

  @Input() id: number = 0;
  @Input() isChecked: boolean = false;

  @Output() onToggleEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onToggle(){
    this.onToggleEvent.emit(!this.isChecked)
  }

}

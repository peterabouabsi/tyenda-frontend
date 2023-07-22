import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{

  @Input() value: string = '';
  @Input() color: string = '';//blue, white, red, red-white, orange, black, gray, etc.

  ngOnInit(): void {
  }
}

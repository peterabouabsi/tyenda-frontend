import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit{

  @Input() color?: string = '';
  @Input() value?: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

//Views
import { OrderOverview } from 'src/app/Shared/Models/Views/Order/OrderOverview.view';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit{

  @Input() data: OrderOverview;

  constructor() {
  }

  ngOnInit(): void {
  }

}

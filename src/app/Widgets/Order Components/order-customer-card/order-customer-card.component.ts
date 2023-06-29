import { Component, Input, OnInit } from '@angular/core';

//Views
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';

@Component({
  selector: 'app-order-customer-card',
  templateUrl: './order-customer-card.component.html',
  styleUrls: ['./order-customer-card.component.scss']
})
export class OrderCustomerCardComponent implements OnInit{

  @Input() data: OrderBasicView;

  constructor() {
  }

  ngOnInit(): void {
  }

}

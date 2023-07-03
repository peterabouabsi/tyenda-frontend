import { Component, OnInit } from '@angular/core';

//Views
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';

@Component({
  selector: 'app-customer-item-orders',
  templateUrl: './customer-item-orders.component.html',
  styleUrls: ['./customer-item-orders.component.scss']
})
export class CustomerItemOrdersComponent implements OnInit{

  public itemOrders: OrderBasicView[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}

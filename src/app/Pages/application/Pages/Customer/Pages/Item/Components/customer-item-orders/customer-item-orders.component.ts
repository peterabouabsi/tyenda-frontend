import { Component, OnInit } from '@angular/core';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Views
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';

@Component({
  selector: 'app-customer-item-orders',
  templateUrl: './customer-item-orders.component.html',
  styleUrls: ['./customer-item-orders.component.scss']
})
export class CustomerItemOrdersComponent implements OnInit{

  /* ------------ Global Properties */
  public appMainRouteCustomer: string = Constants.APP_MAIN_ROUTE_CUSTOMER;
  /* --------------- Global Properties */

  public itemOrders: OrderBasicView[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Views
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';

@Component({
  selector: 'app-order-customer-card',
  templateUrl: './order-customer-card.component.html',
  styleUrls: ['./order-customer-card.component.scss']
})
export class OrderCustomerCardComponent implements OnInit{

  @Input() data: OrderBasicView;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public openOrder(){
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+"/order/"+this.data.id]);
  }

}

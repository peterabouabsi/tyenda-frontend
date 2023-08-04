import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//environments
import { environment } from 'src/environments/environments';

//Views
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit{

  public fileBaseUrl: string = environment.fileBaseUrl;

  @Input() data: OrderBasicView;
  @Input() onClickRoute: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public openOrder(){
    this.router.navigate([this.onClickRoute+"/order/"+this.data.id]);
  }

}

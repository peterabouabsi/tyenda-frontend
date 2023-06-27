import { Component, OnInit } from '@angular/core';
import { SearchResultConfig } from 'src/app/Shared/Models/Config/Search/SearchResultConfig.config';

@Component({
  selector: 'app-orders-customer',
  templateUrl: './orders-customer.component.html',
  styleUrls: ['./orders-customer.component.scss']
})
export class OrdersCustomerComponent implements OnInit {


  //replace any | any with Order View Model
  public searchResultConfig: SearchResultConfig<any> = { value: '4 Orders found', data: [1,1,1,1,1,1] }

  constructor() {
  }

  ngOnInit(): void {

    this.readData();
  }

  private readData(onSearchButton?: boolean) {
    if (onSearchButton) {
      //Search filtered orders
    } else {
      //read all orders
    }
  }

  public search() {
    this.readData(true)
    //save the searched data in: this.searchResultConfig.data
  }
  public clearSearchResult() {
    this.readData();
  }

}

import { Component, OnInit } from '@angular/core';

//Config
import { PagerDataConfig } from 'src/app/Shared/Models/Config/Pager/PagerDataConfig.config';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent implements OnInit{

  //Replace <any> with the exact <ViewModelDataType>
  public topSellingItem: any = {};
  public overviews: any[] = [1,1,1,1,1];
  public itemsData: PagerDataConfig<any> = {data: [1,1,1], count: 6, dataPerPage: 3}
  public storesData: PagerDataConfig<any> = {data: [1,1,1], count: 6, dataPerPage: 3}
  public ordersData: PagerDataConfig<any> = {data: [1,1,1], count: 6, dataPerPage: 3}

  constructor() {
  }

  ngOnInit(): void {
    this.readTopSellingItem();
    this.readOverview();
    this.readItems();
    this.readStores();
    this.readOrders();
  }

  private readTopSellingItem(){}
  private readItems(){}
  private readStores(){}
  private readOrders(){}
  private readOverview(){}

  public getPagingData(category: string, data: any){
    let top = data.top;
    let skip = data.skip;

    if(category == 'items'){
      //Get pagging items
    }
    if(category == 'stores'){
      //Get pagging stores
    }
    if(category == 'orders'){
      //Get pagging orders
    }
  }
}

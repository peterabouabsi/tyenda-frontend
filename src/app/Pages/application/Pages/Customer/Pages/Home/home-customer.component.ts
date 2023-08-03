import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Config
import { PagerDataConfig } from 'src/app/Shared/Models/Config/Pager/PagerDataConfig.config';

//Views
import { OrderOverview } from 'src/app/Shared/Models/Views/Order/OrderOverview.view';
import { StoreModerateView } from 'src/app/Shared/Models/Views/Store/StoreModerateView.view';
import { ItemBasicView } from 'src/app/Shared/Models/Views/Item/ItemBasicView.view';
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';

//Services
import { CustomerHomeService } from './Services/customer-home.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent implements OnInit{

  public topSellingItem: ItemBasicView;
  public overviews: OrderOverview[] = [];
  public itemsData: PagerDataConfig<ItemBasicView> = {data: [], count: 0, dataPerPage: 3}
  public storesData: PagerDataConfig<StoreModerateView> = {data: [], count: 0, dataPerPage: 3}
  public orders: OrderBasicView[] = [];

  constructor(private router: Router,
              private customerHomeService: CustomerHomeService) {
  }

  ngOnInit(): void {
    this.readTopSellingItem();
    this.readOverview();
    this.readItems(this.itemsData.dataPerPage, 0);
    this.readStores(this.storesData.dataPerPage, 0);
    this.readOrders();
  }

  private readTopSellingItem(){
    this.customerHomeService.getTopSellingItem().subscribe((response: any) => {
      if(!response.error){
        this.topSellingItem = response;
      }
    });
  }
  private readOverview(){
    this.customerHomeService.getOrdersOverview().subscribe((response: any) => {
      if(!response.error){
        this.overviews = response;
      }
    });
  }
  private readItems(top: number, skip: number){
    this.customerHomeService.getRandomItems(top, skip).subscribe((response: any) => {
      if(!response.error){
        this.itemsData = {...this.itemsData, count: response.count, data: response.data};
      }
    });
  }
  private readStores(top: number, skip: number){
    this.customerHomeService.getRandomStores(top, skip).subscribe((response: any) => {
      if(!response.error){
        this.storesData = {...this.storesData, count: response.count, data: response.data};
      }
    });
  }
  private readOrders(){
    this.customerHomeService.getRecentOrders().subscribe((response: any) => {
      if(!response.error){
        this.orders = response;
      }
    })
  }

  public getPagingData(category: string, data: any){
    let top = data.top;
    let skip = data.skip;

    if(category == 'items'){
      this.readItems(top, skip);
    }
    if(category == 'stores'){
      this.readStores(top, skip);
    }
  }

  public routeTo(path: string, queryParams: any = {}){
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+path], {queryParams: queryParams});
  }
}

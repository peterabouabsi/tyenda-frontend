import { Component, OnInit } from '@angular/core';

//Config
import { PagerDataConfig } from 'src/app/Shared/Models/Config/Pager/PagerDataConfig.config';

//Views
import { StoreModerateView } from 'src/app/Shared/Models/Views/Store/StoreModerateView.view';
import { ItemBasicView } from 'src/app/Shared/Models/Views/Item/ItemBasicView.view';

//Services
import { CustomerHomeService } from './Services/customer-home.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent implements OnInit{

  //Replace <any> with the exact <ViewModelDataType>
  public topSellingItem: ItemBasicView;
  public overviews: any[] = [1,1,1,1,1];
  public itemsData: PagerDataConfig<ItemBasicView> = {data: [], count: 0, dataPerPage: 3}
  public storesData: PagerDataConfig<StoreModerateView> = {data: [], count: 0, dataPerPage: 3}
  public orders: any[] = [1,1,1,1];

  constructor(private customerHomeService: CustomerHomeService) {
  }

  ngOnInit(): void {
    this.readTopSellingItem();
    this.readOverview();
    this.readItems(this.itemsData.dataPerPage, 0);
    this.readStores(this.storesData.dataPerPage, 0);
    this.readOrders();
  }

  private readTopSellingItem(){}
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
  private readOrders(){}
  private readOverview(){}

  public getPagingData(category: string, data: any){
    let top = data.top;
    let skip = data.skip;

    if(category == 'items'){
      this.readItems(top, skip);
    }
    if(category == 'stores'){
      this.readStores(top, skip);
    }
    if(category == 'orders'){
      //Get pagging orders
    }
  }
}

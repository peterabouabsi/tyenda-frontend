import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { CustomerItemService } from './Services/customer-item.service';

//Views
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { ItemAdvancedView } from 'src/app/Shared/Models/Views/Item/ItemAdvancedView.view';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit{

  public item: ItemAdvancedView; //item data (description)
  public itemOrders: any[] = []; //My item orders (orders)

  //active index: description = 1 ; orders = 2
  public FilterIndexConfig: any = {options: ['Description', 'Orders'], active: 1};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private customerItemService: CustomerItemService) {
  }

  ngOnInit(): void {
    this.displayItemNameOnTabBar();
  }

  private displayItemNameOnTabBar(){
    this.globalService.setTab(this.route, Constants.ITEM_NAME_RESOLVER);
  }

  private async readItemDescription(): Promise<void> {
    let itemId = this.route.snapshot.params['itemId'];
    const response = await this.customerItemService.getItemDescription(itemId).toPromise();
    if (!response.error) {
      this.item = response;

      console.log(this.item)
    }
  }
  private async readMyItemOrders(): Promise<void> {
    let itemId = this.route.snapshot.params['itemId'];
    const response = await this.customerItemService.getMyItemOrders(itemId).toPromise();
    if (!response.error) {
      this.itemOrders = response;
    }
  }

  /*------------ Execute whenever router-outlet component is changed --------------*/
  public async onComponentActivation(component: any): Promise<void> {
    if (this.FilterIndexConfig.active == 1) {
      await this.readItemDescription(); // Ensure the item is fetched before setting it on the component
      component.item = this.item;
    }
    if (this.FilterIndexConfig.active == 2) {
      await this.readMyItemOrders(); // Ensure the itemOrders is fetched before setting it on the component
      component.itemOrders = this.itemOrders;
    }
  }
  /*------------ Execute whenever router-outlet component is changed --------------*/

  /*----------- Switch between Description/Orders filter options ------------*/
  public setFilterIndex(index: number) {
    this.FilterIndexConfig.active = index;
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+'item/'+this.item.id+'/'+this.FilterIndexConfig.options[index-1].toLowerCase()])
  }
  /*----------- Switch between Description/Orders filter options ------------*/


}

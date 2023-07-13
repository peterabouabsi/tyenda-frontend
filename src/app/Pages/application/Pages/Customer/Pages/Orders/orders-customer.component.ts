import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { CustomerOrdersService } from './Services/customer-orders.service';

//Components
import { ExpansionPanelComponent } from 'src/app/Widgets/Other Components/expansion-panel/expansion-panel.component';

//Config
import { SearchResultConfig } from 'src/app/Shared/Models/Config/Search/SearchResultConfig.config';

//Views
import { BasicTimestampView } from 'src/app/Shared/Models/Views/Timestamp/BasicTimestampView.view';
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';

//Forms
import { OrdersSearchForm } from 'src/app/Shared/Models/Forms/OrdersSearchForm.form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-customer',
  templateUrl: './orders-customer.component.html',
  styleUrls: ['./orders-customer.component.scss']
})
export class OrdersCustomerComponent implements OnInit {

  public dates: BasicTimestampView[] = [];
  public orderStatuses: string[] = [];

  public searchFilter: FormGroup = new FormGroup({
    keywords: new FormControl('', []),
    reference: new FormControl('', []),
    timestamp: new FormControl(null, []),
    statuses: new FormControl([], [])
  });

  //replace any | any with Order View Model
  public searchResultConfig: SearchResultConfig<OrderBasicView> = { value: '', data: [], loaded: false }

  constructor(private router: Router,
              private globalService: GlobalService,
              private customerOrdersService: CustomerOrdersService) {
  }

  ngOnInit(): void {
    this.readTimestamps();
    this.readOrderStatuses();

    this.readData();
  }

  private readTimestamps() {
    this.dates = this.globalService.getTimestamps();
  }
  private readOrderStatuses() {
    this.orderStatuses = this.globalService.getOrderStatuses();
  }

  private readData(onSearchButton?: boolean) {
    let form: OrdersSearchForm = !onSearchButton ? {} : {
      keyword: this.searchFilter.get('keywords').value,
      reference: this.searchFilter.get('reference').value,
      minDate: this.searchFilter.get('timestamp').value ? this.searchFilter.get('timestamp').value.id : null,
      orderStatuses: this.searchFilter.get('statuses').value
    };

    this.searchResultConfig.loaded = false;
    this.customerOrdersService.searchOrders(form).subscribe((response: any) => {
      if (!response.error) {
        this.searchResultConfig = {
          value: onSearchButton ? response.length + ' orders found' : '',
          data: response,
          loaded: true
        };
      }
    });
  }

  /*----------- Set value to the corresponding formControl ----------*/
  public setValue(formControlName: string, value: any) {
    this.searchFilter.get(formControlName).setValue(value);
  }
  /*----------- Set value to the corresponding formControl ----------*/

  @ViewChild('filterPanel') filterPanelRef: ExpansionPanelComponent;
  public search() {
    this.filterPanelRef.isExpansionOpened = false;
    this.readData(true);
  }
  public clearSearchResult() {
    this.searchFilter = new FormGroup({
      keywords: new FormControl('', []),
      reference: new FormControl('', []),
      timestamp: new FormControl(null, []),
      statuses: new FormControl([], [])
    });
    this.readData();
  }

  public navigateToItems(){
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+"search"], {queryParams: {type: Constants.ITEM_TYPE}});
  }

}

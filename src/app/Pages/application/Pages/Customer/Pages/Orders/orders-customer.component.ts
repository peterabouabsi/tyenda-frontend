import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Config
import { SearchResultConfig } from 'src/app/Shared/Models/Config/Search/SearchResultConfig.config';

//Views
import { BasicTimestampView } from 'src/app/Shared/Models/Views/Timestamp/BasicTimestampView.view';

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
  public searchResultConfig: SearchResultConfig<any> = { value: '4 Orders found', data: [1,1,1,1,1,1] }

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.readTimestamps();
    this.readOrderStatuses();

    this.readData();
  }

  private readTimestamps() {
    this.dates = this.globalService.getTimestamps();
  }
  private readOrderStatuses(){
    this.orderStatuses = this.globalService.getOrderStatuses();
  }


  private readData(onSearchButton?: boolean) {
    if (onSearchButton) {
      //Search filtered orders
    } else {
      //read all orders
    }
  }

  /*----------- Set value to the corresponding formControl ----------*/
  public setValue(formControlName: string, value: any){
    this.searchFilter.get(formControlName).setValue(value);
  }
  /*----------- Set value to the corresponding formControl ----------*/

  public search() {
    this.readData(true)
    //save the searched data in: this.searchResultConfig.data
  }
  public clearSearchResult() {
    this.readData();
  }

}

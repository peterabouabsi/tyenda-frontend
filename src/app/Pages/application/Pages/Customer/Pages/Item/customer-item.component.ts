import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/Shared/Models/constants.model';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit{

  //active index: description = 1 ; orders = 2
  public FilterIndexConfig: any = {options: ['Description', 'Orders'], active: 1};

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.readItem();
  }

  private readItem(){
    let itemId = this.route.snapshot.params['itemId'];
    //read item
  }

  /*----------- Switch between Description/Orders filter options ------------*/
  public setFilterIndex(index: number) {
    this.FilterIndexConfig.active = index;
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+'item/::itemid::/'+this.FilterIndexConfig.options[index-1].toLowerCase()])
  }
  /*----------- Switch between Description/Orders filter options ------------*/


}

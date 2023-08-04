import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Environment
import { environment } from 'src/environments/environments';

//Views
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { StoreHomeService } from './Services/store-home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.scss']
})
export class HomeStoreComponent implements OnInit {
  /* ----------- Global Properties */
  public fileBaseUrl: string = environment.fileBaseUrl;
  public appMainRouteStore: string = Constants.APP_MAIN_ROUTE_STORE;
  /* Global Properties ----------- */

  public profileImage: string = '';

  public months: any[] = []; //[{id:'1', value: 'Januray'}, etc.]
  public todayMonthIndex: string = ''; //'1'(January), etc.
  public monthlyIncomeForm: FormGroup = new FormGroup({ month: new FormControl(null, [Validators.required]) });

  public recentOrders: OrderBasicView[] = [];

  constructor(private globalService: GlobalService,
              private storeHomeService: StoreHomeService) {
  }

  ngOnInit(): void {
    this.getMonth();

    this.readProfileImage();
    this.getMonthIncomes();
    this.getRecentOrders();
  }

  private getMonth(){
    let {months, todayMonth} = this.globalService.getMonths();
    this.months = months;
    this.todayMonthIndex = todayMonth.toString();
  }

  private readProfileImage(){
    this.globalService.getProfileImage().subscribe((response: any) => {
      if(!response.error){
        this.profileImage = response.profileImage;
      }
    });
  }

  private getMonthIncomes(){
    //Backend
  }

  private getRecentOrders(){
    this.storeHomeService.getRecentOrders().subscribe((response: any) => {
      if(!response.error){
        this.recentOrders = response;
      }
    })
  }

  private getSimilarStores(){}

  public setValue(formControlName: string, value: string){
    this.monthlyIncomeForm.get(formControlName).setValue(value);
    this.getMonthIncomes();
  }

}

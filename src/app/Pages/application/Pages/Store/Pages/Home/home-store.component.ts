import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Environment
import { environment } from 'src/environments/environments';

//Views
import { OrderBasicView } from 'src/app/Shared/Models/Views/Order/OrderBasicView.view';
import { MonthlyIncomePerYearView } from 'src/app/Shared/Models/Views/Monthly Income/MonthlyIncomePerYearView.view';
import { TopCustomerView } from 'src/app/Shared/Models/Views/Customer/TopCustomerView.view';
import { StoreModerateView } from 'src/app/Shared/Models/Views/Store/StoreModerateView.view';

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

  public monthlyIncomeForm: FormGroup = new FormGroup({ year: new FormControl(null, [Validators.required]) });
  public monthlyIncomes: MonthlyIncomePerYearView = {years: [], incomes: []};
  public currentYear: string = '';

  public topCustomers: TopCustomerView[] = [];
  public recentOrders: OrderBasicView[] = [];
  public similarStores: StoreModerateView[] = [];

  constructor(private globalService: GlobalService,
              private storeHomeService: StoreHomeService) {
  }

  ngOnInit(): void {
    this.readProfileImage();
    this.getMonthlyIncomes();
    this.getTopCustomers();
    this.getRecentOrders();
    this.getSimilarStores(3);
  }

  private readProfileImage(){
    this.globalService.getProfileImage().subscribe((response: any) => {
      if(!response.error){
        this.profileImage = response.profileImage;
      }
    });
  }
  public onIncomesloading: boolean = false;
  private getMonthlyIncomes(year: number = new Date().getFullYear()){
    this.onIncomesloading = true;
    this.storeHomeService.getMonthlyIncome(year).subscribe((response: any) => {
      setTimeout(() => {
        this.onIncomesloading = false;
        if(!response.error){
          response.incomes = response.incomes.reverse();
          this.monthlyIncomes = response;
          if(year == new Date().getFullYear()) this.currentYear = this.monthlyIncomes.years[this.monthlyIncomes.years.length - 1].id.toString();
          else this.currentYear = this.monthlyIncomes.years.find((data: any) => {return data.id === year}).id.toString();
        }
      }, 1000);
    });
  }
  private getTopCustomers(){
    this.storeHomeService.getTopCustomers().subscribe((response: any) => {
      if(!response.error){
        this.topCustomers = response;
      }
    });
  }
  private getRecentOrders(){
    this.storeHomeService.getRecentOrders().subscribe((response: any) => {
      if(!response.error){
        this.recentOrders = response;
      }
    })
  }
  private getSimilarStores(take: number = -1){
    this.storeHomeService.getSimilarStores(take).subscribe((response: any) => {
      if(!response.error){
        this.similarStores = response;
      }
    })
  }

  public setValue(formControlName: string, value: any){
    this.monthlyIncomeForm.get(formControlName).setValue(value);
    this.getMonthlyIncomes(value.value);
  }

}

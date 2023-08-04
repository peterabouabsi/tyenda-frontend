import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-home',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.scss']
})
export class HomeStoreComponent implements OnInit {

  public fileBaseUrl: string = environment.fileBaseUrl;

  public profileImage: string = '';

  public months: any[] = []; //[{id:'1', value: 'Januray'}, etc.]
  public todayMonthIndex: string = ''; //'1'(January), etc.
  public monthlyIncomeForm: FormGroup = new FormGroup({ month: new FormControl(null, [Validators.required]) });

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.readProfileImage();
    this.getMonth();
    this.getMonthIncomes();
  }

  private readProfileImage(){
    this.globalService.getProfileImage().subscribe((response: any) => {
      if(!response.error){
        this.profileImage = response.profileImage;
      }
    });
  }
  private getMonth(){
    let {months, todayMonth} = this.globalService.getMonths();
    this.months = months;
    this.todayMonthIndex = todayMonth.toString();
  }
  private getMonthIncomes(){
    //Backend
  }
  private getRecentOrders(){}
  private getSimilarStores(){}

  public setValue(formControlName: string, value: string){
    this.monthlyIncomeForm.get(formControlName).setValue(value);
    this.getMonthIncomes();
  }

}

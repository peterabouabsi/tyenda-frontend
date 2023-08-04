import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.scss']
})
export class HomeStoreComponent implements OnInit {

  public months: any[] = []; //[{id:'1', value: 'Januray'}, etc.]
  public todayMonthIndex: string = ''; //'1'(January), etc.
  public monthlyIncomeForm: FormGroup = new FormGroup({ month: new FormControl(null, [Validators.required]) });

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getMonth();
    this.getMonthIncomes();
  }


  private getMonth(){
    let {months, todayMonth} = this.globalService.getMonths();
    this.months = months;
    this.todayMonthIndex = todayMonth.toString();
  }
  private getMonthIncomes(){
    //Backend
  }

  public setValue(formControlName: string, value: string){
    this.monthlyIncomeForm.get(formControlName).setValue(value);
    this.getMonthIncomes();
  }

}

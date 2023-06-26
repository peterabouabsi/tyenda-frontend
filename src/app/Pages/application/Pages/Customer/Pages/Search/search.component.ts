import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  //Replace <any> with the exact viewModel
  public countries: any[] = [];
  public cities: any[] = [];
  public categories: any[] = [];
  public timestamps: string[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 30000;

  public searchFilter: FormGroup = new FormGroup({
    name: new FormControl('', []),
    createdAt: new FormControl('', []),
    categories: new FormControl([], []),
    city: new FormControl(null, []),
    country: new FormControl(null, []),
    price: new FormControl([this.minPrice, this.maxPrice], []),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  public setValue(formControlName: string, value: any){
    if(formControlName == 'categories'){
      this.searchFilter.get(formControlName).value.push(value);//push value to arrays such as categories, etc.
    }else{

      if(formControlName == 'country'){
        this.searchFilter.get('city').setValue('');
      }

      this.searchFilter.get(formControlName).setValue(value);//set value such as city, name, etc.
    }
  }

  public removeValue(formControlName: string, index: number){
    if(Array.isArray(this.searchFilter.get(formControlName).value)){
      this.searchFilter.get(formControlName).value.splice(index, 1);
    }
  }

  /*----------- Switch between Store/Item filter options ------------*/
  public activeFilterIndex: number = 1;
  public setFilterIndex(index: number){
    this.activeFilterIndex = index;
  }
  /*----------- Switch between Store/Item filter options ------------*/

}

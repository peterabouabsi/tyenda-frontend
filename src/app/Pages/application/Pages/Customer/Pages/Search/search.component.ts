import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Views
import { BasicCountryView } from 'src/app/Shared/Models/Views/Country/BasicCountryView.view';
import { BasicCityView } from 'src/app/Shared/Models/Views/City/BasicCityView.view';
import { BasicCategoryView } from 'src/app/Shared/Models/Views/Category/BasicCategoryView.view';
import { BasicTimestampView } from 'src/app/Shared/Models/Views/Timestamp/BasicTimestampView.view';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //Replace <any> with the exact viewModel
  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];
  public categories: BasicCategoryView[] = [];
  public dates: BasicTimestampView[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 30000;

  public searchFilter: FormGroup = new FormGroup({
    name: new FormControl('', []),
    timestamp: new FormControl(null, []),
    categories: new FormControl([], []),
    city: new FormControl(null, []),
    country: new FormControl(null, []),
    price: new FormControl([this.minPrice, this.maxPrice], []),
  });

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.readCountries();
    this.readCategories();
    this.readTimestamps();
  }

  private readCountries() {
    this.globalService.getCountries().subscribe((response: any) => {
      if (!response.error) {
        this.countries = response;
      }
    });
  }

  private readCategories() {
    this.globalService.getCategories().subscribe((response: any) => {
      if (!response.error) {
        this.categories = response;
      }
    });
  }

  private readTimestamps() {
    this.dates = this.globalService.getTimestamps();
  }

  public setValue(formControlName: string, value: any) {
    if (formControlName == 'country'){
      this.searchFilter.get('city').setValue('');
      this.globalService.getCities(value.id).subscribe((response: any) => {
        if(!response.error){
          this.cities = response;
        }
      });
    }
    this.searchFilter.get(formControlName).setValue(value);
  }

  public removeValue(formControlName: string, index: number) {
    if (Array.isArray(this.searchFilter.get(formControlName).value)) {
      this.searchFilter.get(formControlName).value.splice(index, 1);
    }
  }

  /*----------- Switch between Store/Item filter options ------------*/
  public activeFilterIndex: number = 1;
  public setFilterIndex(index: number) {
    this.activeFilterIndex = index;
  }
  /*----------- Switch between Store/Item filter options ------------*/

}

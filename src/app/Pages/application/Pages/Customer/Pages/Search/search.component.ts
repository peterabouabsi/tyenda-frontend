import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

//Config
import { SearchResultConfig } from 'src/app/Shared/Models/Config/Search/SearchResultConfig.config';

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

  //active index: store = 1 ; item = 2
  public activeFilterIndex: number = 1;

  //Data required for the filter expansion section
  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];
  public categories: BasicCategoryView[] = [];
  public dates: BasicTimestampView[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 30000;

  //replace any | any with Store and Item View Models
  public searchResultConfig: SearchResultConfig<any | any> = { value: "4 Items found", data: [], loaded: false };

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

    this.readData();
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

  private readData(onSearchButton?: boolean) {
    if (this.activeFilterIndex == 1) {
      if (onSearchButton) {
        //Search filtered stores
      } else {
        //read all stores
      }
    }
    if (this.activeFilterIndex == 2) {
      if (onSearchButton) {
        //Search filtered items
      } else {
        //read all items
      }
    }
  }

  public search() {
    if (this.activeFilterIndex == 1) {
      this.readData(true)
      //save the searched data in: this.searchResultConfig.data
    }
    if (this.activeFilterIndex == 2) {
      this.readData(true)
      //save the searched data in: this.searchResultConfig.data
    }
  }
  public clearSearchResult() {
    this.readData();
  }

  /*----------- Set value to the corresponding formControl ----------*/
  public setValue(formControlName: string, value: any) {
    if (formControlName == 'country') {
      this.searchFilter.get('city').setValue('');
      this.globalService.getCities(value.id).subscribe((response: any) => {
        if (!response.error) {
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
  /*----------- Set value to the corresponding formControl ----------*/

  /*----------- Switch between Store/Item filter options ------------*/
  public setFilterIndex(index: number) {
    this.activeFilterIndex = index;
  }
  /*----------- Switch between Store/Item filter options ------------*/
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Config
import { SearchResultConfig } from 'src/app/Shared/Models/Config/Search/SearchResultConfig.config';

//Components
import { ExpansionPanelComponent } from 'src/app/Widgets/Other Components/expansion-panel/expansion-panel.component';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { CustomerSearchService } from './Services/customer-search.service';

//Views
import { BasicCountryView } from 'src/app/Shared/Models/Views/Country/BasicCountryView.view';
import { BasicCityView } from 'src/app/Shared/Models/Views/City/BasicCityView.view';
import { BasicCategoryView } from 'src/app/Shared/Models/Views/Category/BasicCategoryView.view';
import { BasicTimestampView } from 'src/app/Shared/Models/Views/Timestamp/BasicTimestampView.view';

//Views
import { StoreModerateView } from 'src/app/Shared/Models/Views/Store/StoreModerateView.view';
import { ItemBasicView } from 'src/app/Shared/Models/Views/Item/ItemBasicView.view';

//Forms
import { ItemStoreSearchForm } from 'src/app/Shared/Models/Forms/ItemStoreSearchForm.form';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //active index: store = 1 ; item = 2
  public FilterIndexConfig: any = {options: [Constants.STORE_TYPE, Constants.ITEM_TYPE], active: 1};

  //Data required for the filter expansion section
  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];
  public categories: BasicCategoryView[] = [];
  public dates: BasicTimestampView[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 30000;

  //Search result
  public searchResultConfig: SearchResultConfig<StoreModerateView | ItemBasicView> = { value: "", data: [], loaded: false };

  //Search filter
  public searchFilter: FormGroup = new FormGroup({
    name: new FormControl('', []),
    createdAt: new FormControl(null, []),
    categories: new FormControl([], []),
    city: new FormControl(null, []),
    country: new FormControl(null, []),
    price: new FormControl([this.minPrice, this.maxPrice], []),
  });

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService,
              private customerSearchService: CustomerSearchService) {
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
    let form: ItemStoreSearchForm = {
      name: this.searchFilter.get('name').value,
      createdAt: this.searchFilter.get('createdAt').value ? this.searchFilter.get('createdAt').value.id : null,
      price: this.searchFilter.get('price').value,
      city: this.searchFilter.get('city').value ? this.searchFilter.get('city').value.id : null,
      categories: this.searchFilter.get('categories').value.map(category => category.id)
    };

    let type = this.route.snapshot.queryParams['type'];

    if(type == Constants.ITEM_TYPE) this.FilterIndexConfig.active = 2;
    if(type == Constants.STORE_TYPE) this.FilterIndexConfig.active = 1;
    if(type == undefined){
      if (this.FilterIndexConfig.active == 1) type = Constants.STORE_TYPE;
      if (this.FilterIndexConfig.active == 2) type = Constants.ITEM_TYPE;
    }

    this.customerSearchService.searchData(type, form).subscribe((response: any) => {
      if (!response.error) {
        this.searchResultConfig = { value: onSearchButton ? `${response.length} ${type.toLowerCase()}s found` : '', data: response, loaded: true }
      }
    });

  }

  @ViewChild('expansionPanel') expansionPanelRef: ExpansionPanelComponent;
  public search() {
    this.readData(true);
    this.expansionPanelRef.isExpansionOpened = false;
  }
  public clearSearchResult() {
    this.searchFilter = this.resetForm();
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
    this.globalService.removeQueryParameterAsync().then(() => {
      this.searchFilter = this.resetForm();
      this.FilterIndexConfig.active = index;
      this.readData();
      this.expansionPanelRef.isExpansionOpened = false;
    });
  }
  /*----------- Switch between Store/Item filter options ------------*/

  /*----------- Reset form group ------------*/
  public resetForm() {
    return new FormGroup({
      name: new FormControl('', []),
      createdAt: new FormControl(null, []),
      categories: new FormControl([], []),
      city: new FormControl(null, []),
      country: new FormControl(null, []),
      price: new FormControl([this.minPrice, this.maxPrice], []),
    });
    /*----------- Reset form group ------------*/
  }
}

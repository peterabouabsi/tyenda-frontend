import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//Config
import { SearchResultConfig } from 'src/app/Shared/Models/Config/Search/SearchResultConfig.config';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Forms
import { ItemStoreSearchForm } from 'src/app/Shared/Models/Forms/ItemStoreSearchForm.form';

//Views
import { BasicCategoryView } from 'src/app/Shared/Models/Views/Category/BasicCategoryView.view';
import { BasicCityView } from 'src/app/Shared/Models/Views/City/BasicCityView.view';
import { BasicCountryView } from 'src/app/Shared/Models/Views/Country/BasicCountryView.view';
import { ItemBasicView } from 'src/app/Shared/Models/Views/Item/ItemBasicView.view';
import { BasicTimestampView } from 'src/app/Shared/Models/Views/Timestamp/BasicTimestampView.view';

//Components
import { ExpansionPanelComponent } from 'src/app/Widgets/Other Components/expansion-panel/expansion-panel.component';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { StoreItemSearchService } from './Services/store-item-search.service';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-items.component.html',
  styleUrls: ['./store-items.component.scss']
})
export class StoreItemsComponent implements OnInit{

  //Data required for the filter expansion section
  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];
  public categories: BasicCategoryView[] = [];
  public dates: BasicTimestampView[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 30000;

  //Search result
  public itemSearchResultConfig: SearchResultConfig<ItemBasicView> = { value: "", data: [], loaded: false };

  //Search filter
  public searchFilter: FormGroup = new FormGroup({
    name: new FormControl('', []),
    createdAt: new FormControl(null, []),
    categories: new FormControl([], []),
    city: new FormControl(null, []),
    country: new FormControl(null, []),
    price: new FormControl([this.minPrice, this.maxPrice], []),
  });

  constructor(private router: Router,
              private globalService: GlobalService,
              private storeItemSearchService: StoreItemSearchService) {
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

    this.storeItemSearchService.searchData(form).subscribe((response: any) => {
      if (!response.error) {
        this.itemSearchResultConfig = { value: onSearchButton ? `${response.length} ${(response.length > 1? 'items' : 'item')} found` : ``, data: response, loaded: true }
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
  /*----------- Set value to the corresponding formControl ----------*/

  public removeValue(formControlName: string, index: number) {
    if (Array.isArray(this.searchFilter.get(formControlName).value)) {
      this.searchFilter.get(formControlName).value.splice(index, 1);
    }
  }

  public addNewItem(){
    this.router.navigate([Constants.APP_MAIN_ROUTE_STORE+'add-new-item']);
  }

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

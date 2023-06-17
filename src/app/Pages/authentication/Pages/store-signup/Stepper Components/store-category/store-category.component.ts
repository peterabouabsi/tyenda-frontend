import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Views
import { BasicCategoryView } from 'src/app/Shared/Models/Views/Category/BasicCategoryView.view';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.scss']
})
export class StoreCategoryComponent implements OnInit {

  public step: number = 4;
  public storeData: any = {};

  public categories: BasicCategoryView[] = [];

  public storeCategoryForm: FormGroup = new FormGroup({ category: new FormControl(null) });
  public selectedCategory: BasicCategoryView[] = [];

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getStoreData();
    this.readCategories();
  }

  //Get categories saved in storeData (localstorage) if exist
  private getStoreData() {
    this.storeData = this.globalService.getStorage(Constants.STORAGE_STORE_DATA);
    this.selectedCategory = this.storeData.categories? this.storeData.categories : [];
  }
  //-------------------------------------------------------------

  //Get Categories from backend
  private readCategories() {
    this.globalService.getCategories().subscribe((response: any) => {
      if (!response.error) {
        this.categories = response;
      }
    });
  }
  //-------------------------------------------------------------

  //Save the storeData in localstorage
  private setStoreData() {
    this.globalService.setStorage(Constants.STORAGE_STORE_DATA, this.storeData);
  }
  //-------------------------------------------------------------

  public setValue(formControl: string, value: any) {
    this.storeCategoryForm.get(formControl).setValue(value);
    this.globalService.checkExistancy(this.selectedCategory, { id: value.id }, (exist: boolean) => {
      if (!exist) {
        this.selectedCategory.push(value);
        this.storeData['categories'] = this.selectedCategory;
        this.setStoreData();
      }
    });
  }

  public deleteCategory(index: number) {
    this.selectedCategory.splice(index, 1);
    this.storeData['categories'] = this.selectedCategory;
    this.setStoreData();
  }
}

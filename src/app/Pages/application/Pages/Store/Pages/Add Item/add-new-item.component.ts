import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Views
import { BasicCategoryView } from 'src/app/Shared/Models/Views/Category/BasicCategoryView.view';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit{

  public categories: BasicCategoryView[] = [];

  public postItemForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categories: new FormControl([], []),
    price: new FormControl(0, [Validators.required]),
    discount: new FormControl(0, []),
    colors: new FormControl([], []),
    sizes: new FormControl([], []),
    colorSizes: new FormControl([], [])
  })

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(){
    this.globalService.getCategories().subscribe((response: any) => {
      if(!response.error) this.categories = response;
    });
  }

  public setValue(formControlName: string, value: any){
    this.postItemForm.get(formControlName).setValue(value);
  }
  public setValueList(formControlName: string, value: any){
    let selectedCategories = this.postItemForm.get(formControlName).value;
    this.globalService.checkExistancy(selectedCategories, {id: value.id}, (exist: boolean, index: number) => {
      if(exist) selectedCategories.splice(index, 1);
      else selectedCategories.push(value)
    });
  }

  public onChipDelete(formControlName: string, index: number){
    let selectedDataList: any[] = this.postItemForm.get(formControlName).value;
    selectedDataList.splice(index, 1);
    this.postItemForm.get(formControlName).setValue(selectedDataList);
  }

  public colorSizeIndex: number = 0;
  public setColorSizeIndex(index: number){
    this.colorSizeIndex = index;
  }
}

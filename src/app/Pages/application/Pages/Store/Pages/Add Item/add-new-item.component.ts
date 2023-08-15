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
  public sizeCodes: string[] = [];

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
    this.getSizeCodes();
  }

  private getCategories(){
    this.globalService.getCategories().subscribe((response: any) => {
      if(!response.error) this.categories = response;
    });
  }

  private getSizeCodes(){
    this.sizeCodes = ['XSmall', 'Small', 'Medium', 'Large', 'XLarge', 'XxLarge']
  }

  public setValue(formControlName: string, value: any){
    this.postItemForm.get(formControlName).setValue(value);
  }
  public setValueList(formControlName: string, value: any, includeDeletion: boolean = true, includeFilter: boolean = true){
    if(value){
      let selectedData = this.postItemForm.get(formControlName).value;
      this.globalService.checkExistancy(selectedData, includeFilter? {id: value.id} : value, (exist: boolean, index: number) => {
        if(exist) {
          if(includeDeletion)
            selectedData.splice(index, 1);
        }else {
          selectedData.push(value);
        }
      });
    }
  }

  public onChipDelete(formControlName: string, index: number){
    let selectedDataList: any[] = this.postItemForm.get(formControlName).value;
    selectedDataList.splice(index, 1);
    this.postItemForm.get(formControlName).setValue(selectedDataList);
  }

  public colorSizeIndex: number = 1;
  public setColorSizeIndex(index: number){
    this.colorSizeIndex = index;
    this.globalService.clearFormValue(this.postItemForm, ['colors', 'sizes', 'colorSizes'], [[], [], []])
  }

  public colorInput: string = '';
  public onColorDelete: boolean = false;
  public colorFormControl: FormControl = new FormControl(0, []);

  public sizeInput: string | number = '';
  public onSizeDelete: boolean = false;
  public sizeNumberFormControl: FormControl = new FormControl(0, []);

}

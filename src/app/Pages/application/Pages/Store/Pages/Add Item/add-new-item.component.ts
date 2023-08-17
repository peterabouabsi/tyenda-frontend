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
export class AddNewItemComponent implements OnInit {

  public categories: BasicCategoryView[] = [];
  public sizeCodes: any[] = [];

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

  public inputForm: FormGroup = new FormGroup({
    color: new FormControl('', []),
    sizeNumber: new FormControl(0, []),
    sizeCode: new FormControl('', [])
  })

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getSizeCodes();
  }

  private getCategories() {
    this.globalService.getCategories().subscribe((response: any) => {
      if (!response.error) this.categories = response;
    });
  }

  private getSizeCodes() {
    this.sizeCodes = this.globalService.getSizeCodes();
  }

  public setValue(formControlName: string, value: any) {
    this.postItemForm.get(formControlName).setValue(value);
  }
  public setValueList(formControlName: string, value: any, includeDeletion: boolean = true, includeFilterion: boolean = true) {
    if(value){
      this.globalService.checkExistancy(this.postItemForm.get(formControlName).value, includeFilterion? { id: value.id } : value, (exist: boolean, index: number) => {
        if (exist) {
          if(includeDeletion) this.postItemForm.get(formControlName).value.splice(index, 1);
        } else {
          this.postItemForm.get(formControlName).value.push(value);
        }
      });
    }
  }

  public onChipDelete(formControlName: string, index: number) {
    let selectedDataList: any[] = this.postItemForm.get(formControlName).value;
    selectedDataList.splice(index, 1);
    this.postItemForm.get(formControlName).setValue(selectedDataList);
  }

  /* ---------------- Color, Sizes, Color Sizes Section */
  public colorSizeIndex: number = 0;
  public setColorSizeIndex(index: number) {
    this.colorSizeIndex = index;
    this.globalService.clearFormValue(this.postItemForm, ['colors', 'sizes', 'colorSizes'], [[], [], []]);
    this.globalService.clearFormValue(this.inputForm, ['color', 'sizeNumber', 'sizeCode'], ['', 0, '']);
  }

  public setInputValue(formControlName: string, value: any){
    this.inputForm.get(formControlName).setValue(value);
  }

  public setColorValueList(){
    let typedColor = this.inputForm.get('color').value;
    if(typedColor != ''){this.setValueList('colors', {color: typedColor, quantity: 1}, false, false)}

    this.inputForm = this.globalService.clearFormValue(this.inputForm, ['color'], ['']);
  }
  public updateColorQuantity(quantity: number, index: number){
    this.postItemForm.get('colors').value[index].quantity = quantity;
  }
  public deleteColor(index: number){
    this.postItemForm.get('colors').value.splice(index, 1)
  }


  /* Color, Sizes, Color Sizes Section ------------------ */

}

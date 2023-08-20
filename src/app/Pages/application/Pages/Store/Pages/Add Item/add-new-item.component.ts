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
    initialImage: new FormControl(null, [Validators.required]),
    images: new FormControl([], []),
    colors: new FormControl([], []),
    sizes: new FormControl([], []),
    colorSizes: new FormControl([], [])
  })

  public inputForm: FormGroup = new FormGroup({
    color: new FormControl('', []),
    sizeNumber: new FormControl(0, []),
    sizeCode: new FormControl('', []),
    colorSizes: new FormControl({color: '', sizes: [], index: 0}, [])
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

  public setValue(formGroup: any, formControlName: string, value: any) {
    if(formControlName == 'colorSizes')
      formGroup.get(formControlName).setValue({color: value, sizes: [], index: 0});
    else
      formGroup.get(formControlName).setValue(value);
  }
  public setValueList(formControlName: string, value: any, includeDeletion: boolean = true, searchFilter: any = null) {
    if(value){
      this.globalService.checkExistancy(this.postItemForm.get(formControlName).value, searchFilter? searchFilter : { id: value.id }, (exist: boolean, index: number) => {
        if (exist) {
          if(includeDeletion) this.postItemForm.get(formControlName).value.splice(index, 1);
        } else {
          this.postItemForm.get(formControlName).value.push(value);
        }
      });
    }
  }
  public onItemImage(formControlName: string, event: any, index: number = -1){
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      let fileBlob = event.target.result;
      if(formControlName == 'initialImage') this.setValue(this.postItemForm, formControlName, fileBlob);
      if(formControlName == 'images') {
        if(index == -1) this.postItemForm.get(formControlName).value.push(fileBlob); //adding image
        else  this.postItemForm.get(formControlName).value[index] = fileBlob//Updating image
      }
    };
    reader.readAsDataURL(file);
  }
  public onChipDelete(formControlName: string, index: number) {
    let selectedDataList: any[] = this.postItemForm.get(formControlName).value;
    selectedDataList.splice(index, 1);
    this.postItemForm.get(formControlName).setValue(selectedDataList);
  }

  /* ---------------- Color, Sizes, Color Sizes Section */
  public colorSizeIndex: number = 3;
  public setColorSizeIndex(index: number) {
    this.colorSizeIndex = index;
    this.globalService.clearFormValue(this.postItemForm, ['colors', 'sizes', 'colorSizes'], [[], [], []]);
    this.globalService.clearFormValue(this.inputForm, ['color', 'sizeNumber', 'sizeCode'], ['', 0, '']);
  }

  //Color, SizeNumber and SizeCode
  public setInputValueList(type: string, formControlName: string){
    if(type == 'color'){
      let typedColor = this.inputForm.get(type).value;
      if(typedColor != ''){this.setValueList(formControlName, {color: typedColor, quantity: 1}, false, {color: typedColor})}

      this.inputForm = this.globalService.clearFormValue(this.inputForm, ['color'], ['']);
    }

    if(type == 'sizeNumber'){
      let typedSizeNumber = this.inputForm.get(type).value;
      if(typedSizeNumber > 0){this.setValueList(formControlName, {code: null, number: typedSizeNumber, quantity: 1}, false, {number: typedSizeNumber})}

      this.inputForm = this.globalService.clearFormValue(this.inputForm, ['sizeNumber'], [0]);
    }

    if(type == 'sizeCode'){
      let typedSizeCode = this.inputForm.get(type).value.value;//{id: 1, value: ''}.value
      if(typedSizeCode != ''){this.setValueList(formControlName, {code: typedSizeCode, number: null, quantity: 1}, false, {code: typedSizeCode})}

      this.inputForm = this.globalService.clearFormValue(this.inputForm, ['sizeCode'], ['']);
    }

    if(type == 'colorSizes'){
      let typedColor = this.inputForm.get(type).value.color;
      if(typedColor != ''){this.setValueList(formControlName, {color: typedColor, sizes: [], index: 0}, false, {color: typedColor})}

      this.inputForm = this.globalService.clearFormValue(this.inputForm, ['colorSizes'], [{color: '', sizes: [], index: 0}]);
    }
  }
  public updateInputQuantity(formControlName: string, quantity: number, index: number){
    this.postItemForm.get(formControlName).value[index].quantity = quantity;
  }
  public deleteInput(formControlName: string, index: number){
    this.postItemForm.get(formControlName).value.splice(index, 1)
  }
  // Color, SizeNumber and SizeCode

  //---- Color-Sizes -----
  public setColorSizesIndex(index: number, colorSizesIndex: number) {
    this.inputForm.get('colorSizes').value.index = index;
    this.postItemForm.get('colorSizes').value[colorSizesIndex].index = index;

    this.inputForm.get('colorSizes').value.sizes = [];
    this.postItemForm.get('colorSizes').value[colorSizesIndex].sizes = [];
  }
  public addColorSize(colorSizeFilterIndex: number, colorIndex: number, value: any){
    this.globalService.checkExistancy(
      this.postItemForm.get('colorSizes').value[colorIndex].sizes,
      { code: colorSizeFilterIndex == 0? value.value : null, number: colorSizeFilterIndex == 1? value : null },
      (exist: boolean) => {
        if (!exist) {
          this.inputForm.get('colorSizes').value.sizes.push({
            code: colorSizeFilterIndex == 0? value : null,
            number: colorSizeFilterIndex == 1? value : null,
            quantity: 1
          });
          this.postItemForm.get('colorSizes').value[colorIndex].sizes.push({
            code: colorSizeFilterIndex == 0? value.value : null,
            number: colorSizeFilterIndex == 1? value : null,
            quantity: 1
          });
        }
  });

  }
  public updateColorSizeQuantity(quantity: number, colorIndex: number, sizeIndex: number){
    this.postItemForm.get('colorSizes').value[colorIndex].sizes[sizeIndex].quantity = quantity;
  }
  public onSizeChipDelete(colorIndex: number, sizeIndex: number){
    if(this.postItemForm.get('colorSizes').value[colorIndex].sizes.length == 1){
      this.deleteInput('colorSizes', colorIndex);
    }else{
      this.postItemForm.get('colorSizes').value[colorIndex].sizes.splice(sizeIndex, 1);
    }

  }
  //---- Color-Sizes -----

  public addItem(){}

}

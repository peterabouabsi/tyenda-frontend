import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//Environments
import { environment } from 'src/environments/environments';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { AddUpdateItemService } from './services/add-update-item.service';

//Views
import { BasicCategoryView } from 'src/app/Shared/Models/Views/Category/BasicCategoryView.view';

//Components
import { AlertComponent } from 'src/app/Widgets/Other Components/alert/alert.component';

//Forms
import { AddUpdateItemForm } from 'src/app/Shared/Models/Forms/AddUpdateItemForm.form';

@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.component.html',
  styleUrls: ['./add-update-item.component.scss']
})
export class AddUpdateItemComponent implements OnInit {

  public fileBaseUrl: string = environment.fileBaseUrl;

  public item: any;

  public categories: BasicCategoryView[] = [];
  public sizeCodes: any[] = [];

  //Final Result
  public postItemForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categories: new FormControl([], []),
    price: new FormControl(0, [Validators.required]),
    discount: new FormControl(0, []),
    notes: new FormControl([], []),
    initialImage: new FormControl(null, []),
    images: new FormControl([], []),
    colors: new FormControl([], []),
    sizes: new FormControl([], []),
    colorSizes: new FormControl([], [])
  })

  //Input Process
  public inputForm: FormGroup = new FormGroup({
    note: new FormControl('', []),
    initialImage: new FormControl('', []),
    images: new FormControl([], []),
    color: new FormControl('', []),
    sizeNumber: new FormControl(0, []),
    sizeCode: new FormControl('', []),
    colorSizes: new FormControl({ value: '', sizes: [], index: 0 }, [])
  })

  constructor(private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService,
              private addUpdateItemService: AddUpdateItemService) {
  }

  ngOnInit(): void {
    this.getItemStatus();
    this.getCategories();
    this.getSizeCodes();
  }

  private getItemStatus() {
    let id = this.route.snapshot.queryParams['itemId'];
    if (id) {
      this.addUpdateItemService.getItemDescription(id).subscribe((response: any) => {
        if (!response.error) {
          this.item = response;
          this.setValue(this.postItemForm, 'name', this.item.value);
          this.setValue(this.postItemForm, 'description', this.item.description);
          this.setValue(this.postItemForm, 'categories', this.item.categories);
          this.setValue(this.postItemForm, 'price', this.item.price);
          this.setValue(this.postItemForm, 'discount', this.item.discount);
          this.setValue(this.postItemForm, 'notes', this.item.notes);

          let initialImage = this.item.images.shift();
          this.inputForm.get('initialImage').setValue({ id: initialImage.id, url: this.fileBaseUrl+initialImage.url });
          for (let image of this.item.images) {
            this.inputForm.get('images').value.push({ id: image.id, url: this.fileBaseUrl+image.url });
          }

          if(this.item.colors){
            this.colorSizeIndex = 0;
            this.setValue(this.postItemForm, 'colors', this.item.colors.map((color: any) => {return {value: color.value, quantity: color.quantity}}));
          }
          if(this.item.sizes.length > 0){
            if(this.item.sizes[0].number) this.colorSizeIndex = 1;
            if(this.item.sizes[0].code) this.colorSizeIndex = 2;
            this.setValue(this.postItemForm, 'sizes', this.item.sizes.map((size: any) => {return {code: size.code, number: size.number, quantity: size.quantity}}));
          }
          if (this.item.colorSizes.length > 0) {
            this.colorSizeIndex = 3;
            this.item.colorSizes.forEach((color: any) => {
              this.postItemForm.get('colorSizes').value.push({ value: color.value, sizes: color.sizes.map((size: any) => {
                return {code: size.code, number: size.number, quantity: size.quantity, index: size.code? 0 : 1}
              }), index: color.sizes.length > 0 && color.sizes[0].code? 0 : 1});
            })
          }

        }
      });
    }
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
    if (formControlName == 'colorSizes')
      formGroup.get(formControlName).setValue({ value: value, sizes: [], index: 0 });
    else
      formGroup.get(formControlName).setValue(value);
  }
  public setValueList(formControlName: string, value: any, includeDeletion: boolean = true, searchFilter: any = null) {
    if (value) {
      this.globalService.checkExistancy(this.postItemForm.get(formControlName).value, searchFilter ? searchFilter : { id: value.id }, (exist: boolean, index: number) => {
        if (exist) {
          if (includeDeletion) this.postItemForm.get(formControlName).value.splice(index, 1);
        } else {
          this.postItemForm.get(formControlName).value.push(value);
        }
      });
    }
  }
  public onItemImage(formControlName: string, event: any, index: number = -1, imageId: any = undefined) {
    //When New Item
    let file = event.target.files[0];
    console.log(imageId)
    if (formControlName == 'initialImage') this.setValue(this.postItemForm, formControlName, imageId? {id: imageId, file: file} : file);
    if (formControlName == 'images') {
      if (index == -1) this.postItemForm.get(formControlName).value.push(imageId != undefined? {id: imageId, file: file} : file); //adding image
      else this.postItemForm.get(formControlName).value[index] = imageId != undefined? {id: imageId, file: file} : file//Updating image
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      let fileBlob = event.target.result;
      if (formControlName == 'initialImage') this.setValue(this.inputForm, formControlName, fileBlob);
      if (formControlName == 'images') {
        if (index == -1) this.inputForm.get(formControlName).value.push(fileBlob); //adding image
        else this.inputForm.get(formControlName).value[index] = fileBlob//Updating image
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
  public colorSizeIndex: number = -1;
  public setColorSizeIndex(index: number) {
    this.colorSizeIndex = index;
    this.globalService.clearFormValue(this.postItemForm, ['colors', 'sizes', 'colorSizes'], [[], [], []]);
    this.globalService.clearFormValue(this.inputForm, ['color', 'sizeNumber', 'sizeCode'], ['', 0, '']);
  }

  //Note, Color, SizeNumber and SizeCode
  public setInputValueList(type: string, formControlName: string) {
    if (type == 'color') {
      let typedColor = this.inputForm.get(type).value;
      if (typedColor != '') { this.setValueList(formControlName, { value: typedColor, quantity: 1 }, false, { value: typedColor }) }

      this.inputForm = this.globalService.clearFormValue(this.inputForm, ['color'], ['']);
    }

    if (type == 'sizeNumber') {
      let typedSizeNumber = this.inputForm.get(type).value;
      if (typedSizeNumber > 0) { this.setValueList(formControlName, { code: null, number: typedSizeNumber, quantity: 1 }, false, { number: typedSizeNumber }) }

      this.inputForm = this.globalService.clearFormValue(this.inputForm, ['sizeNumber'], [0]);
    }

    if (type == 'sizeCode') {
      let typedSizeCode = this.inputForm.get(type).value.value;//{id: 1, value: ''}.value
      if (typedSizeCode != '') { this.setValueList(formControlName, { code: typedSizeCode, number: null, quantity: 1 }, false, { code: typedSizeCode }) }

      this.inputForm = this.globalService.clearFormValue(this.inputForm, ['sizeCode'], ['']);
    }

    if (type == 'colorSizes') {
      let typedColor = this.inputForm.get(type).value.value;
      if (typedColor != '') { this.setValueList(formControlName, { value: typedColor, sizes: [], index: 0 }, false, { value: typedColor }) }

      this.inputForm = this.globalService.clearFormValue(this.inputForm, ['colorSizes'], [{ value: '', sizes: [], index: 0 }]);
    }
  }
  public updateInputQuantity(formControlName: string, quantity: number, index: number) {
    this.postItemForm.get(formControlName).value[index].quantity = quantity;
  }
  public deleteInput(formControlName: string, index: number) {
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
  public addColorSize(colorSizeFilterIndex: number, colorIndex: number, value: any) {
    this.globalService.checkExistancy(
      this.postItemForm.get('colorSizes').value[colorIndex].sizes,
      { code: colorSizeFilterIndex == 0 ? value.value : null, number: colorSizeFilterIndex == 1 ? value : null },
      (exist: boolean) => {
        if (!exist) {
          this.inputForm.get('colorSizes').value.sizes.push({
            code: colorSizeFilterIndex == 0 ? value : null,
            number: colorSizeFilterIndex == 1 ? value : null,
            quantity: 1
          });
          this.postItemForm.get('colorSizes').value[colorIndex].sizes.push({
            code: colorSizeFilterIndex == 0 ? value.value : null,
            number: colorSizeFilterIndex == 1 ? value : null,
            quantity: 1
          });
        }
      });
  }
  public updateColorSizeQuantity(quantity: number, colorIndex: number, sizeIndex: number) {
    this.postItemForm.get('colorSizes').value[colorIndex].sizes[sizeIndex].quantity = quantity;
  }
  public onSizeChipDelete(colorIndex: number, sizeIndex: number) {
    if (this.postItemForm.get('colorSizes').value[colorIndex].sizes.length == 1) {
      this.deleteInput('colorSizes', colorIndex);
    } else {
      this.postItemForm.get('colorSizes').value[colorIndex].sizes.splice(sizeIndex, 1);
    }

  }
  //---- Color-Sizes -----

  public onConfirmationItem: boolean = false;
  public addUpdateItem() {
    let isFormValid = false;
    if(this.postItemForm.valid){
      if(this.colorSizeIndex == 0 && this.postItemForm.get('colors').value.length > 0) isFormValid = true;
      else if((this.colorSizeIndex == 1 || this.colorSizeIndex == 2) && this.postItemForm.get('sizes').value.length > 0) isFormValid = true;
      else if(this.colorSizeIndex == 3 && this.postItemForm.get('colorSizes').value.length > 0) isFormValid = true;
      else isFormValid = false
    }

    if(isFormValid){
      this.globalService.openDialog(AlertComponent,
      {
        title: 'Confirm',
        message: 'Are you sure you want to confirm item creation?',
        buttons: [
          {
            value: 'Confirm', color: 'blue', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
              if (this.onConfirmationItem == false) {
                this.onConfirmationItem = true;

                let addUpdateItemForm: AddUpdateItemForm = {
                  id: this.item? this.item.id : null,
                  value: this.postItemForm.get('name').value,
                  description: this.postItemForm.get('description').value,
                  price: this.postItemForm.get('price').value,
                  discount: this.postItemForm.get('discount').value,
                  notes: this.postItemForm.get('notes').value,
                  categories: this.postItemForm.get('categories').value.map((category: any) => category.id),
                  colors: this.postItemForm.get('colors').value,
                  sizes: this.postItemForm.get('sizes').value,
                  colorSizes: this.postItemForm.get('colorSizes').value
                }

                let initialImage = this.postItemForm.get('initialImage').value;
                let otherImages = this.postItemForm.get('images').value;

                let allImages = [];

                if(initialImage == null) allImages  = otherImages
                else allImages = [initialImage, ...otherImages]

                if (allImages.length > 0 || this.item) {
                  console.log(allImages);

                  this.addUpdateItemService.addUpdate(addUpdateItemForm).subscribe((response: any) => {
                    if(!response.error){
                      let itemId = response.id;
                      if (itemId) {
                        for (let image of allImages) {
                          let formData = new FormData();
                          formData.append('ItemId', itemId);
                          if (image.id) {
                            formData.append('Id', image.id);
                            formData.append('File', image.file);
                          } else {
                            formData.append('File', image);
                          }
                          this.addUpdateItemService.addUpdateImage(formData).subscribe((response: any) => { });
                        }
                        setTimeout(() => {
                          dialogRef.close();
                          this.router.navigate([Constants.APP_MAIN_ROUTE_STORE + 'item/' + itemId]);
                        }, 3000)
                      }
                    }
                  });
                } else {
                  alert('Item requires at least one image');
                }
              }
            }
          },
          { value: 'Cancel', color: 'gray', onButtonClick: (dialogRef: any) => { dialogRef.close() } }
        ]
      }, null);
    }
  }

}

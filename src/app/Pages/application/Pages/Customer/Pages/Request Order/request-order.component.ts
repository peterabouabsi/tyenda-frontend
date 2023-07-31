import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { RequestOrderService } from './Services/request-order.service';

//Views
import { BasicCountryView } from 'src/app/Shared/Models/Views/Country/BasicCountryView.view';
import { BasicCityView } from 'src/app/Shared/Models/Views/City/BasicCityView.view';
import { ItemEntryView } from 'src/app/Shared/Models/Views/Item/ItemEntryView.view';


//Forms
import { RequestOrderForm } from 'src/app/Shared/Models/Forms/RequestOrderForm.form';

//Components
import { AlertComponent } from 'src/app/Widgets/Other Components/alert/alert.component';
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';

@Component({
  selector: 'app-request-order',
  templateUrl: './request-order.component.html',
  styleUrls: ['./request-order.component.scss']
})
export class RequestOrderComponent implements OnInit {

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;

  //The item to order
  public itemToOrder: ItemEntryView;

  //Request Order Form
  public requestOrderForm: FormGroup = new FormGroup({
    receiverFirstname: new FormControl('', []),
    receiverLastname: new FormControl('', []),
    receiverEmail: new FormControl('', []),
    receiverPhone: new FormControl('', []),
    country: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    addressDetails: new FormControl('', [Validators.required]),
    note: new FormControl('', []),
    latitude: new FormControl(0, []),
    longitude: new FormControl(0, []),
    colors: new FormControl([]),
    sizes: new FormControl([]),
    colorSizes: new FormControl([])
  });

  //Total Quantity Selected
  public totalQuantity: number = 0;


  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService,
              private requestOrderService: RequestOrderService) {
  }

  ngOnInit(): void {
    this.readItemToOrder();
    this.readCountries();
  }

  private readItemToOrder() {
    let itemId = this.route.snapshot.params['itemId'];
    this.requestOrderService.getItem(itemId).subscribe((response: any) => {
      if (!response.error) {
        this.itemToOrder = response;
      }
    })
  }
  private readCountries() {
    this.globalService.getCountries().subscribe((response: any) => {
      if (!response.error) {
        this.countries = response;
      }
    });
  }

  /*--------- Set values to the request-order-form */
  public setValue(formControlName: string, value: any) {
    if (formControlName == 'country') {
      //get country's cities
      let countryId = value.id;
      this.globalService.getCities(countryId).subscribe((response: any) => {
        if (!response.error) {
          this.cities = response;
        }
      });
    } else if (formControlName == 'colors' || formControlName == 'sizes') {
      this.globalService.checkExistancy(this.requestOrderForm.get(formControlName).value, { id: value.id }, (exist, index) => {
        if (exist) {
          if (index + 1 > 0) this.requestOrderForm.get(formControlName).value.splice(1, index + 1);
          else this.requestOrderForm.get(formControlName).value.shift();

        } else {
          if (formControlName == 'colors') this.requestOrderForm.get(formControlName).value.push({ id: value.id, value: value.value, quantity: 1, maxQuantity: value.quantity });
          if (formControlName == 'sizes') this.requestOrderForm.get(formControlName).value.push({ code: value.code, number: value.number, quantity: 1, maxQuantity: value.quantity });
        }
      });
    } else if (formControlName == 'colorSizes') {
      this.globalService.checkExistancy(this.requestOrderForm.get(formControlName).value, { id: value.id }, (exist, colorIndex) => {
        if (exist) {
          //check if size is already selected
          let sizes = this.requestOrderForm.get('colorSizes').value[colorIndex + 1].sizes;
          this.globalService.checkExistancy(sizes, { code: value.code, number: value.number }, (exist, sizeIndex) => {
            if (exist) {
              //remove the size
              if (sizeIndex + 1 > 0) sizes.splice(1, sizeIndex + 1);
              else sizes.shift();
              if (sizes.length == 0) {
                //remove the whole color
                if (colorIndex + 1 > 0) this.requestOrderForm.get(formControlName).value.splice(1, colorIndex = 1);
                else this.requestOrderForm.get(formControlName).value.shift();
              }
            } else {
              //add size
              sizes.push({ code: value.code, number: value.number, quantity: 1, maxQuantity: value.quantity })
            }
          });
        } else {
          this.requestOrderForm.get(formControlName).value.push({ id: value.id, value: value.value, sizes: [{ code: value.code, number: value.number, quantity: 1, maxQuantity: value.quantity }] })
        }
      });
    } else {
      this.requestOrderForm.get(formControlName).setValue(value);
    }

    if (formControlName == 'colors' || formControlName == 'sizes' || formControlName == 'colorSizes') this.totalQuantity = this.getTotalQuantitySelected(this.requestOrderForm.get(formControlName).value, formControlName == 'colorSizes' ? true : false);

  }
  /*Set values to the request-order-form --------- */

  /*--------- Update Quantity */
  public updateQuantity(formControlName: string, quantity: number, index: number | number[]) {
    if (formControlName == 'colors' && !Array.isArray(index)) this.requestOrderForm.get('colors').value[index].quantity = quantity;
    if (formControlName == 'sizes' && !Array.isArray(index)) this.requestOrderForm.get('sizes').value[index].quantity = quantity;
    if (formControlName == 'colorSizes' && Array.isArray(index)) this.requestOrderForm.get('colorSizes').value[index[0]].sizes[index[1]].quantity = quantity;

    this.totalQuantity = this.getTotalQuantitySelected(this.requestOrderForm.get(formControlName).value, formControlName == 'colorSizes' ? true : false);
  }
  /*Update Quantity ---------*/

  /*--------- Confirm and (Request/Cancel) Order */
  private onRequestingOrder = false;
  public confirmOrder() {

    var isColorsValid = this.requestOrderForm.get('colors').value.length > 0;
    var isSizesValid = this.requestOrderForm.get('sizes').value.length > 0;
    var isColorSizesValid = this.requestOrderForm.get('colorSizes').value.length > 0;

    if (this.requestOrderForm.valid && (isColorsValid || isSizesValid || isColorSizesValid)) {

      this.globalService.openDialog(AlertComponent,
        {
          title: 'Request Order',
          message: 'Are you sure you want to proceed with the request?',
          buttons: [
            { value: 'Request Order', color: 'blue', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
                if(this.onRequestingOrder == false) {
                  this.onRequestingOrder = true;

                  let requestOrderForm: RequestOrderForm = {
                    itemId: this.itemToOrder.id,
                    receiverName: this.requestOrderForm.get('receiverFirstname').value + " " + this.requestOrderForm.get('receiverLastname').value,
                    receiverEmail: this.requestOrderForm.get('receiverEmail').value,
                    receiverPhone: this.requestOrderForm.get('receiverPhone').value,
                    cityId: this.requestOrderForm.get('city').value.id,
                    addressDetails: this.requestOrderForm.get('addressDetails').value,
                    note: this.requestOrderForm.get('note').value,
                    longitude: this.requestOrderForm.get('longitude').value,
                    latitude: this.requestOrderForm.get('latitude').value,
                    colors: this.requestOrderForm.get('colors').value,
                    sizes: this.requestOrderForm.get('sizes').value,
                    colorSizes: this.requestOrderForm.get('colorSizes').value
                  }
                  this.requestOrderService.requestOrder(requestOrderForm).subscribe((response: any) => {
                    if (!response.error) {
                      setTimeout(() => {
                        dialogRef.close();
                        this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+'/order/'+response.orderId]);
                      }, 3000)
                    }
                  });
                }
              }
            },
            { value: 'Cancel', color: 'gray', onButtonClick: (dialogRef: any) => { dialogRef.close() } }
          ]
        }, null);
    } else {
      this.toastrRef.onDanger('Request Order', 'Please complete the required information !', 5);
    }
  }
  /*Confirm and (Request/Cancel) Order ---------*/

  /* ------------ Generate the total quantity selected (Color, Size or ColorSizes) ------------ */
  private getTotalQuantitySelected(array: any[], isColorSizes: boolean = false) {
    let sum = 0;

    if (isColorSizes) {
      array.forEach((color) => {
        color.sizes.forEach((size) => {
          sum += size.quantity;
        })
      });
    } else {
      array.forEach((object) => {
        sum += object.quantity;
      });
    }

    return sum;
  }
  /* ------------ Generate the total quantity selected (Color, Size or ColorSizes) ------------ */

  /* ------------ enable-disable another recipient inputs ------------ */
  public isInputDisabled: boolean = true;
  public enableDisabledReceiverInputs(isChecked: boolean) {
    this.isInputDisabled = !isChecked;
    if (!this.isInputDisabled) {
      //add Receiver first, lastname and email Validators
      this.requestOrderForm = this.globalService.addFormValidators(this.requestOrderForm, ['receiverFirstname', 'receiverLastname', 'receiverEmail', 'receiverPhone'], [Validators.required]);
      this.requestOrderForm = this.globalService.addFormValidators(this.requestOrderForm, ['receiverEmail'], [Validators.email]);
    } else {
      this.requestOrderForm = this.globalService.clearFormValidators(this.requestOrderForm, ['receiverFirstname', 'receiverLastname', 'receiverEmail', 'receiverPhone']);
      this.requestOrderForm = this.globalService.clearFormValue(this.requestOrderForm, ['receiverFirstname', 'receiverLastname', 'receiverEmail', 'receiverPhone'], ['', '', '', '']);
    }
  }
  /* ------------ enable-disable another recipient inputs ------------ */

}

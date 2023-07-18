import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { RequestOrderService } from './Services/request-order.service';

//Views
import { BasicCountryView } from 'src/app/Shared/Models/Views/Country/BasicCountryView.view';
import { BasicCityView } from 'src/app/Shared/Models/Views/City/BasicCityView.view';

//Config
import { ButtonConfig } from 'src/app/Widgets/Button Components/button-loader/ButtonConfig.form';

//Components
import { ButtonLoaderComponent } from 'src/app/Widgets/Button Components/button-loader/button-loader.component';

//Views
import { ItemEntryView } from 'src/app/Shared/Models/Views/Item/ItemEntryView.view';

@Component({
  selector: 'app-request-order',
  templateUrl: './request-order.component.html',
  styleUrls: ['./request-order.component.scss']
})
export class RequestOrderComponent implements OnInit {

  public itemToOrder: ItemEntryView;

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
    quantity: new FormControl(1, []),
    colors: new FormControl([], []),
    sizes: new FormControl([], []),
    colorSizes: new FormControl([], [])
  });

  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];

  @ViewChild('requestOrderButton') requestOrderButton: ButtonLoaderComponent;
  public buttonConfig: ButtonConfig = { isBlue: true };

  constructor(private route: ActivatedRoute,
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
        if (this.itemToOrder.colors.length > 0) this.requestOrderForm = this.globalService.addFormValidators(this.requestOrderForm, ['colors'], [Validators.required]);
        if (this.itemToOrder.sizes.length > 0) this.requestOrderForm = this.globalService.addFormValidators(this.requestOrderForm, ['sizes'], [Validators.required]);
        if (this.itemToOrder.colorSizes.length > 0) this.requestOrderForm = this.globalService.addFormValidators(this.requestOrderForm, ['colorSizes'], [Validators.required]);
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

  public setValue(formControlName: string, value: any) {
    if (formControlName == 'country') {
      //get country's cities
      let countryId = value.id;
      this.globalService.getCities(countryId).subscribe((response: any) => {
        if (!response.error) {
          this.cities = response;
        }
      });

    } else if (['colors', 'sizes', 'colorSizes'].includes(formControlName)) {
      this.globalService.checkExistancy(
        this.requestOrderForm.get(formControlName).value,
        formControlName == 'colorSizes' ? { id: value.id, code: value.sizeCode, number: value.sizeNumber } : { id: value.id },
        (exist, index) => {
          if (exist) {
            if (index + 1 > 0)
              this.requestOrderForm.get(formControlName).value.splice(1, index + 1);
            else
              this.requestOrderForm.get(formControlName).value.shift();
          } else {
            if (formControlName == 'colors')
              this.requestOrderForm.get(formControlName).value.push({ id: value.id, value: value.value, quantity: 1 });
            if (formControlName == 'sizes')
              this.requestOrderForm.get(formControlName).value.push({ id: value.id, code: value.code, number: value.number, quantity: 1 });

            if (formControlName == 'colorSizes') null
          }
        })

    } else {
      this.requestOrderForm.get(formControlName).setValue(value);
    }

  }


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
    }
  }
  /* ------------ enable-disable another recipient inputs ------------ */

  public requestOrder() {
    //show a dialog for order confirmation
    this.requestOrderButton.onClick(() => { });
  }
}

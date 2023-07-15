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
export class RequestOrderComponent implements OnInit{

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
    quantity: new FormControl(0, []),
  });

  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];

  @ViewChild('requestOrderButton') requestOrderButton: ButtonLoaderComponent;
  public buttonConfig: ButtonConfig = {isBlue: true};

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService,
              private requestOrderService: RequestOrderService) {
  }

  ngOnInit(): void {
    this.readItemToOrder();

    this.readCountries();
  }

  private readItemToOrder(){
    let itemId = this.route.snapshot.params['itemId'];
    this.requestOrderService.getItem(itemId).subscribe((response: any) => {
      if(!response.error){
        this.itemToOrder = response;
      }
    })
  }

  private readCountries(){
    this.globalService.getCountries().subscribe((response: any) => {
      if(!response.error){
        this.countries = response;
      }
    });
  }

  /* ------------ enable-disable another recipient inputs ------------ */
  public isInputDisabled: boolean = true;
  public enableDisabledReceiverInputs(isChecked: boolean){
    this.isInputDisabled = !isChecked;
    if(!this.isInputDisabled) {
      //add Receiver first, lastname and email Validators
      this.requestOrderForm = this.globalService.addFormValidators(this.requestOrderForm, ['receiverFirstname', 'receiverLastname', 'receiverEmail', 'receiverPhone'], [Validators.required]);
      this.requestOrderForm = this.globalService.addFormValidators(this.requestOrderForm, ['receiverEmail'], [Validators.email]);
    }else{
      this.requestOrderForm = this.globalService.clearFormValidators(this.requestOrderForm, ['receiverFirstname', 'receiverLastname', 'receiverEmail', 'receiverPhone']);
    }
  }
  /* ------------ enable-disable another recipient inputs ------------ */

  public setValue(formControlName: string, value: any){
    this.requestOrderForm.get(formControlName).setValue(value);
    if(formControlName == 'country'){
      //get country's cities
      let countryId = value.id;
      this.globalService.getCities(countryId).subscribe((response: any) => {
        if(!response.error){
          this.cities = response;
        }
      });
    }
  }

  public requestOrder(){
    //show a dialog for order confirmation
    this.requestOrderButton.onClick(() => {});
  }
}

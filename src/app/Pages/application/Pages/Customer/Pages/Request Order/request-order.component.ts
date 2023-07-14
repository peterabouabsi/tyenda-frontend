import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Views
import { BasicCountryView } from 'src/app/Shared/Models/Views/Country/BasicCountryView.view';
import { BasicCityView } from 'src/app/Shared/Models/Views/City/BasicCityView.view';

@Component({
  selector: 'app-request-order',
  templateUrl: './request-order.component.html',
  styleUrls: ['./request-order.component.scss']
})
export class RequestOrderComponent implements OnInit{

  public itemToOrder: any;

  public countries: BasicCountryView[] = [];
  public cities: BasicCityView[] = [];

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
    longitude: new FormControl(0, [])
  });

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.readItemToOrder();

    this.readCountries();
  }

  private readItemToOrder(){
    let itemId = this.route.snapshot.params['itemId'];
    this.itemToOrder = {
      id: "b9c4d995-6fd9-4888-85f1-fe82877257b1",
      value: "Xbox",
      imageUrl: "https://images.unsplash.com/photo-1612801799890-4ba4760b6590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHhib3h8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      discount: 50,
      rate: 5.0,
      price: 150.250,
      countOrders: 3,
      countLikes: 0,
      qty: 3
    }
  }

  private readCountries(){
    this.globalService.getCountries().subscribe((response: any) => {
      if(!response.error){
        this.countries = response;
      }
    });
  }
  private readCities(countryId: string){
    this.globalService.getCities(countryId).subscribe((response: any) => {
      if(!response.error){
        this.cities = response;
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
      this.readCities(countryId)
    }
  }
}

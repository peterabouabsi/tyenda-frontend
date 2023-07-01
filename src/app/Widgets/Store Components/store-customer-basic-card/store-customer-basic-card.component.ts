import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Services
import { StoreCardService } from '../Services/store-card.service';

//Views
import { CartStoreBasicView } from 'src/app/Shared/Models/Views/Cart/CartStoreBasicView.view';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';

@Component({
  selector: 'app-store-customer-basic-card',
  templateUrl: './store-customer-basic-card.component.html',
  styleUrls: ['./store-customer-basic-card.component.scss']
})
export class StoreCustomerBasicCardComponent implements OnInit{

  @Input() data: CartStoreBasicView | any;
  @Output() onRemoveEvent = new EventEmitter();

  constructor(private storeCardService: StoreCardService) {
  }

  ngOnInit(): void {
  }

  public addRemoveCart(){
    let form: AddRemoveCartForm = {
      storeId: this.data.storeId
    };
    this.storeCardService.addRemoveCart(form).subscribe((response: any) => {
      if(!response.error){
        this.data.isAddedToCart = response.isAddedToCart
        this.onRemoveEvent.emit();
      }
    });
  }

}

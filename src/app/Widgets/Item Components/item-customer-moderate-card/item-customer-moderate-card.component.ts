import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Services
import { ItemCardService } from 'src/app/Widgets/Item Components/Services/item-card.service';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { ItemCartUpdateForm } from 'src/app/Shared/Models/Forms/ItemCartUpdateForm.form';

//Views
import { CartItemBasicView } from 'src/app/Shared/Models/Views/Cart/CartItemBasicView.view';

@Component({
  selector: 'app-item-customer-moderate-card',
  templateUrl: './item-customer-moderate-card.component.html',
  styleUrls: ['./item-customer-moderate-card.component.scss']
})
export class ItemCustomerModerateCardComponent implements OnInit{

  @Input() data: CartItemBasicView | any;
  @Output() onRemoveEvent = new EventEmitter();

  constructor(private itemCardService: ItemCardService) {
  }

  ngOnInit(): void {
  }

  public addRemoveCart(){
    let form: AddRemoveCartForm = {
      itemId: this.data.itemId
    };

    this.itemCardService.addRemoveCart(form).subscribe((response: any) => {
      if(!response.error){
        this.onRemoveEvent.emit();
      }
    });
  }

  public onQuantityUpdate(quantity: number){
    let form: ItemCartUpdateForm = {
      itemId: this.data.itemId,
      quantity: quantity
    };
    this.itemCardService.updateQuantity(form).subscribe((response: any) => {
      if(!response.error){
        this.data.quantity = response.quantity;
      }
    });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { AddToCartForm } from 'src/app/Shared/Models/Forms/AddToCartForm.form';

//Views
import { ItemBasicView } from 'src/app/Shared/Models/Views/Item/ItemBasicView.view';

//Services
import { ItemCardService } from 'src/app/Widgets/Item Components/Services/item-card.service';

@Component({
  selector: 'app-item-customer-basic-card',
  templateUrl: './item-customer-basic-card.component.html',
  styleUrls: ['./item-customer-basic-card.component.scss']
})
export class ItemCustomerBasicCardComponent implements OnInit{

  @Input() data: ItemBasicView;

  constructor(private itemCardService: ItemCardService) {
  }

  ngOnInit(): void {
  }

  public addRemoveCart(){
    let form: AddToCartForm = {
      itemId: this.data.id
    }

    this.itemCardService.addRemoveCart(form).subscribe((response: any) => {
      if(!response.error){
        this.data.isAddedToCart = response.isAddedToCart;
      }
    });
  }

}

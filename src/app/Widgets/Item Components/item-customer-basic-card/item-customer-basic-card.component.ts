import { Component, Input, OnInit } from '@angular/core';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { LikeItemForm } from 'src/app/Shared/Models/Forms/LikeItemForm.form';

//Views
import { ItemBasicView } from 'src/app/Shared/Models/Views/Item/ItemBasicView.view';

//Services
import { ItemCardService } from 'src/app/Widgets/Item Components/Services/item-card.service';

//Config
import { ItemCustomerBasicCardConfig } from './ItemCustomerBasicCardConfig.config';

@Component({
  selector: 'app-item-customer-basic-card',
  templateUrl: './item-customer-basic-card.component.html',
  styleUrls: ['./item-customer-basic-card.component.scss']
})
export class ItemCustomerBasicCardComponent implements OnInit{

  @Input() data: ItemBasicView;
  @Input() config?: ItemCustomerBasicCardConfig = {showLike: true, showCartButton: true, showOrderButton: true}

  constructor(private itemCardService: ItemCardService) {
  }

  ngOnInit(): void {
    this.generateConfig();
  }

  private generateConfig(){
    const defaultConfig: ItemCustomerBasicCardConfig = {
      showLike: true,
      showCartButton: true,
      showOrderButton: true,
    };

    this.config = { ...defaultConfig, ...this.config };
  }

  public likeDislike(){
    let form: LikeItemForm = {
      itemId: this.data.id
    }

    this.itemCardService.likeDislike(form).subscribe((response: any) => {
      if(!response.error){
        this.data.isItemLiked = response.isItemLiked;
      }
    });
  }
  public addRemoveCart(){
    let form: AddRemoveCartForm = {
      itemId: this.data.id
    }

    this.itemCardService.addRemoveCart(form).subscribe((response: any) => {
      if(!response.error){
        this.data.isAddedToCart = response.isAddedToCart;
      }
    });
  }

}

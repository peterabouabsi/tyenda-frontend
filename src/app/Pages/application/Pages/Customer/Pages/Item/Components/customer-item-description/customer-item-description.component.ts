import { Component, OnInit } from '@angular/core';

//Views
import { ItemAdvancedView } from 'src/app/Shared/Models/Views/Item/ItemAdvancedView.view';

//Services
import { CustomerItemService } from './../../Services/customer-item.service';

//Forms
import { RateItemForm } from 'src/app/Shared/Models/Forms/RateItemForm.form';
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { LikeItemForm } from 'src/app/Shared/Models/Forms/LikeItemForm.form';

@Component({
  selector: 'app-customer-item-description',
  templateUrl: './customer-item-description.component.html',
  styleUrls: ['./customer-item-description.component.scss']
})
export class CustomerItemDescriptionComponent implements OnInit{

  public item: ItemAdvancedView;

  constructor(private customerItemService: CustomerItemService) {
  }

  ngOnInit(): void {
  }

  public onRateItem(rate: number){
    let form: RateItemForm = {
      itemId: this.item.id,
      rate: rate
    }
    this.customerItemService.rateItem(form).subscribe((response: any) => {
      if(!response.error){
        this.item = {...this.item, myRate: response.myRate, rate: response.itemRate}
      }
    });
  }

  public addRemoveCart(){
    let form: AddRemoveCartForm = {
      itemId: this.item.id
    }
    this.customerItemService.addRemoveCart(form).subscribe((response: any) => {
      if(!response.error){
        this.item = {...this.item, isAddedToCart: response.isAddedToCart}
      }
    });
  }

  public likeDislike(){
    let form: LikeItemForm = {
      itemId: this.item.id
    }
    this.customerItemService.likeDislike(form).subscribe((response: any) => {
      if(!response.error){
        this.item = {...this.item, isLiked: response.isItemLiked}
        if(this.item.isLiked) this.item.countLikes++;
        else this.item.countLikes--;
      }
    });
  }

  public activeImageIndex = 0;
  public displaySelectedImage(image: any, index: number){
    this.item.displayedImage = image;
    this.activeImageIndex = index;
  }

  public openCommentsSection(){}
  public order(){}

}

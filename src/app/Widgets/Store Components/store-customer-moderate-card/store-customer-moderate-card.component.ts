import { Component, Input, OnInit } from '@angular/core';

//Forms
import { FollowUnfollowForm } from './../../../Shared/Models/Forms/FollowUnfollowForm.form';
import { AddRemoveCartForm } from '../../../Shared/Models/Forms/AddRemoveCartForm.form';

//Services
import { StoreCardService } from 'src/app/Widgets/Store Components/Services/store-card.service';

//Views
import { StoreModerateView } from 'src/app/Shared/Models/Views/Store/StoreModerateView.view';

@Component({
  selector: 'app-store-customer-moderate-card',
  templateUrl: './store-customer-moderate-card.component.html',
  styleUrls: ['./store-customer-moderate-card.component.scss']
})
export class StoreCustomerModerateCardComponent implements OnInit{

  @Input() data: StoreModerateView;

  constructor(private storeCardService: StoreCardService) {
  }

  ngOnInit(): void {
  }

  public addRemoveCart(){
    let form: AddRemoveCartForm = {
      storeId: this.data.id
    };
    this.storeCardService.addRemoveCart(form).subscribe((response: any) => {
      if(!response.error){
        this.data.isAddedToCart = response.isAddedToCart
      }
    });
  }

  public followUnfollow(){
    let form: FollowUnfollowForm = {
      storeId: this.data.id
    };
    this.storeCardService.followUnfollow(form).subscribe((response: any) => {
      if(!response.error){
        this.data.isFollowed = response.isFollowed
      }
    });
  }

}

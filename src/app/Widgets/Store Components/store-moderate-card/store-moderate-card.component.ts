import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//environment
import { environment } from 'src/environments/environments';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Forms
import { FollowUnfollowForm } from '../../../Shared/Models/Forms/FollowUnfollowForm.form';
import { AddRemoveCartForm } from '../../../Shared/Models/Forms/AddRemoveCartForm.form';

//Services
import { StoreCardService } from 'src/app/Widgets/Store Components/Services/store-card.service';

//Views
import { StoreModerateView } from 'src/app/Shared/Models/Views/Store/StoreModerateView.view';

@Component({
  selector: 'app-store-moderate-card',
  templateUrl: './store-moderate-card.component.html',
  styleUrls: ['./store-moderate-card.component.scss']
})
export class StoreModerateCardComponent implements OnInit{

  public fileBaseUrl: string = environment.fileBaseUrl;

  @Input() data: StoreModerateView | any;

  constructor(private router: Router,
              private storeCardService: StoreCardService) {
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

  public openStoreProfile(){
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+'/store/'+this.data.id]);
  }


}

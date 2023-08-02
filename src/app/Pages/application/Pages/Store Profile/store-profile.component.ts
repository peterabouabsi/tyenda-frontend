import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//environment
import { environment } from 'src/environments/environments';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { StoreProfileService } from './Services/store-profile.service';

//Views
import { StoreAdvancedView } from 'src/app/Shared/Models/Views/Store/StoreAdvancedView.view';
import { StoreTopItemBasicView } from 'src/app/Shared/Models/Views/Store/StoreTopItemBasicView.view';

//Components
import { MapViewComponent } from 'src/app/Widgets/Map Components/map-view/map-view.component';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { FollowUnfollowForm } from 'src/app/Shared/Models/Forms/FollowUnfollowForm.form';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit{

  public fileBaseUrl: string = environment.fileBaseUrl;

  public store: StoreAdvancedView;
  public storeTopItems: StoreTopItemBasicView[] = [];

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService,
              private storeProfileService: StoreProfileService) {
  }

  ngOnInit(): void {
    this.displayStoreNameOnTabBar();
    this.readStore();
    this.readStoreTopItems();
  }

  private readStore(){
    let storeId = this.route.snapshot.params['storeId'];
    this.storeProfileService.getStore(storeId).subscribe((response: any) => {
      if(!response.error){
        this.store = response;
      }
    });
  }

  private readStoreTopItems(){
    let storeId = this.route.snapshot.params['storeId'];
    this.storeProfileService.getStoreTopItems(storeId).subscribe((response: any) => {
      if(!response.error){
        this.storeTopItems = response;
      }
    });
  }

  /* Display the store name on the tab */
  private displayStoreNameOnTabBar(){
    this.globalService.setTab(this.route, Constants.STORE_NAME_RESOLVER)
  }
  /* Display the store name on the tab */

  /* Display Selected branch on the map on double click*/
  public doubleClickCounter: number = 0;
  @ViewChild('viewMap') viewMapRef: MapViewComponent;
  public activeBranchIndex = 0;
  public displaySelectedBranch(latitude: number, longitude: number, index: number){
    this.store.displayedBranch[0] = latitude;
    this.store.displayedBranch[1] = longitude;
    this.doubleClickCounter++;
    if(this.doubleClickCounter == 2){
      this.activeBranchIndex = index;
      this.viewMapRef.updateMarkerPosition();
      this.doubleClickCounter = 0;
    }
  }
  /* Display Selected branch on the map on double click*/

  public addRemoveCart(){
    let form: AddRemoveCartForm = {
      storeId: this.store.id
    }
    this.storeProfileService.addRemoveCart(form).subscribe((response: any) => {
      if(!response.error){
        this.store.isAddedToCart = response.isAddedToCart;
      }
    });
  }

  public followUnfollow(){
    let form: FollowUnfollowForm = {
      storeId: this.store.id
    }
    this.storeProfileService.followUnfollow(form).subscribe((response: any) => {
      if(!response.error){
        this.store.isFollowed = response.isFollowed;
        if(this.store.isFollowed) this.store.countFollowers++;
        else this.store.countFollowers--;
      }
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { StoreProfileService } from './Services/store-profile.service';

//Views
import { storeAdvancedView } from 'src/app/Shared/Models/Views/Store/StoreAdvancedView.view';

//Components
import { MapViewComponent } from 'src/app/Widgets/Map Components/map-view/map-view.component';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit{

  public store: storeAdvancedView;

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService,
              private storeProfileService: StoreProfileService) {
  }

  ngOnInit(): void {
    this.displayStoreNameOnTabBar();
    this.readStore();
  }

  private readStore(){
    let storeId = this.route.snapshot.params['storeId'];
    this.storeProfileService.getStore(storeId).subscribe((response: any) => {
      if(!response.error){
        this.store = response;
      }
    });
  }

  /* Display the store name on the tab */
  private displayStoreNameOnTabBar(){
    this.globalService.setTab(this.route, Constants.STORE_NAME_RESOLVER)
  }
  /* Display the store name on the tab */

  /* Display Selected branch on the map */
  @ViewChild('viewMap') viewMapRef: MapViewComponent;
  public activeBranchIndex = 0;
  public displaySelectedBranch(branch: any, index: number){
    this.store.displayedBranch[0] = branch.latitude;
    this.store.displayedBranch[1] = branch.longitude;
    this.viewMapRef.updateMarkerPosition();
    this.activeBranchIndex = index;
  }
  /* Display Selected branch on the map */

  public addRemoveCart(){}
  public followUnfollow(){}

}

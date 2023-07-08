import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-customer-store',
  templateUrl: './customer-store.component.html',
  styleUrls: ['./customer-store.component.scss']
})
export class CustomerStoreComponent implements OnInit{

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.displayStoreNameOnTabBar();
  }

  private displayStoreNameOnTabBar(){
    this.globalService.setTab(this.route, Constants.STORE_NAME_RESOLVER)
  }

}

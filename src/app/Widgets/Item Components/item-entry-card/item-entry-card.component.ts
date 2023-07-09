import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Forms
import { StoreTopItemBasicView } from 'src/app/Shared/Models/Views/Store/StoreTopItemBasicView.view';

@Component({
  selector: 'app-item-entry-card',
  templateUrl: './item-entry-card.component.html',
  styleUrls: ['./item-entry-card.component.scss']
})
export class ItemEntryCardComponent implements OnInit{

  @Input() data: StoreTopItemBasicView;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public openItemPage(){
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+"/item/"+this.data.id]);
  }
}

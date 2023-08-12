import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Environment
import { environment } from 'src/environments/environments';

//Views
import { ItemBasicView } from 'src/app/Shared/Models/Views/Item/ItemBasicView.view';

@Component({
  selector: 'app-item-store-basic-card',
  templateUrl: './item-store-basic-card.component.html',
  styleUrls: ['./item-store-basic-card.component.scss']
})
export class ItemStoreBasicCardComponent implements OnInit{

  public fileBaseUrl: string = environment.fileBaseUrl;

  @Input() data: ItemBasicView | any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public openItem(){
    this.router.navigate([Constants.APP_MAIN_ROUTE_STORE+'item/'+this.data.id]);
  }
}

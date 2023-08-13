import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Environment
import { environment } from 'src/environments/environments';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { StoreItemService } from './Services/store-item.service';

//Views
import { ItemAdvancedView } from 'src/app/Shared/Models/Views/Item/ItemAdvancedView.view';

//Components
import { AlertComponent } from 'src/app/Widgets/Other Components/alert/alert.component';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {

  /* -------------- Global Properties */
  public fileBaseUrl: string = environment.fileBaseUrl;
  /* Global Properties -------------- */

  public item: ItemAdvancedView;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService,
              private storeItemService: StoreItemService) {
  }

  ngOnInit(): void {
    this.displayItemNameOnTabBar();

    this.readItemDescription();
  }

  private displayItemNameOnTabBar(){
    this.globalService.setTab(this.route, Constants.ITEM_NAME_RESOLVER);
  }

  private async readItemDescription(): Promise<void> {
    let itemId = this.route.snapshot.params['itemId'];
    const response = await this.storeItemService.getItemDescription(itemId).toPromise();
    if (!response.error) {
      this.item = response;
    }
  }

  public activeImageIndex = 0;
  public displaySelectedImage(image: any, index: number) {
    this.item.displayedImage = image;
    this.activeImageIndex = index;
  }

  public openCommentsSection() {
    this.globalService.openDialog(null, this.item.id);
  }

  public editItem(){}

  public onDeleteItem: boolean = false;
  public deleteItem(){
    this.globalService.openDialog(AlertComponent,
      {
        title: 'Approve Order',
        message: 'Are you sure you want to delete this item?',
        buttons: [
            {
              value: 'Delete Item', color: 'red', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
                if (this.onDeleteItem == false) {
                  this.onDeleteItem = true;
                  this.storeItemService.deleteItem(this.item.id).subscribe((response: any) => {
                    setTimeout(() => {
                      dialogRef.close();
                      if(!response.error) this.router.navigate([Constants.APP_MAIN_ROUTE_STORE+'items']);
                    }, 3000)
                  });
                }
              }
            },
          { value: 'Cancel', color: 'gray', onButtonClick: (dialogRef: any) => { dialogRef.close() } }
        ]
      });
  }
}

import { Component, OnInit } from '@angular/core';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Views
import { StoreAdvancedView } from 'src/app/Shared/Models/Views/Store/StoreAdvancedView.view';

//Environment
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-my-store-profile',
  templateUrl: './my-store-profile.component.html',
  styleUrls: ['./my-store-profile.component.scss']
})
export class MyStoreProfileComponent implements OnInit{

  /* Global Variables -------- */
  public fileBaseUrl: string = environment.fileBaseUrl;
  /*-------- Global Variables */

  public store: StoreAdvancedView;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getStore();
  }

  private getStore(){
    this.globalService.getStore(null).subscribe((response: any) => {
      if(!response.error){
        this.store = response;
      }
    });
  }
}

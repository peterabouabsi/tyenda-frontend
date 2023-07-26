import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public order: any = {orderStatus: 'Submitted'};

  public feedbackFrom: FormGroup = new FormGroup({
    feedback: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.displayOrderRefOnTabBar();
  }

  /* Display the order reference on the tab */
  private displayOrderRefOnTabBar() {
    this.globalService.setTab(this.route, Constants.ORDER_REF_RESOLVER)
  }
  /* Display the order reference on the tab */

}

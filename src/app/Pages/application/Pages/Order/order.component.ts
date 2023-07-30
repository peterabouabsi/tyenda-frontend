import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { OrderService } from './Services/order.service';

//Forms
import { AddFeedbackForm } from 'src/app/Shared/Models/Forms/AddFeedbackForm.form';

//Views
import { OrderAdvancedView } from 'src/app/Shared/Models/Views/Order/OrderAdvancedView.view';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public order: OrderAdvancedView;

  public feedbackFrom: FormGroup = new FormGroup({
    feedback: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute,
    private globalService: GlobalService,
    private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.displayOrderRefOnTabBar();
    this.readOrder();
  }

  /* Display the order reference on the tab */
  private displayOrderRefOnTabBar() {
    this.globalService.setTab(this.route, Constants.ORDER_REF_RESOLVER)
  }
  /* Display the order reference on the tab */

  private readOrder() {
    let orderId = this.route.snapshot.params['orderId'];
    this.orderService.getOrder(orderId).subscribe((response: any) => {
      if (!response.error) {
        this.order = response;
      }
    });
  }

  public setValue(formControlName: string, value: any) {
    this.feedbackFrom.get(formControlName).setValue(value);
  }

  public addFeedbackLoading: boolean = false;
  public addFeedback() {
    this.addFeedbackLoading = true;
    if (this.feedbackFrom.valid) {
      let form: AddFeedbackForm = {
        orderId: this.order.id,
        feedback: this.feedbackFrom.get('feedback').value
      }

      this.orderService.addFeedback(form).subscribe((response: any) => {
        setTimeout(() => {
          this.addFeedbackLoading = false;
          if (!response.error) {
            //Show Toaster
          }
        }, 3000)
      })

    } else {
      this.addFeedbackLoading = false;
      this.markFormAsDirty();
    }
  }

  private markFormAsDirty() {
    Object.keys(this.feedbackFrom.getRawValue()).forEach(formControlName => {
      this.feedbackFrom.get(formControlName).markAsDirty();
    });
  }
}

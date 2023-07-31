import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { OrderService } from './Services/order.service';

//Forms
import { AddFeedbackForm } from 'src/app/Shared/Models/Forms/AddFeedbackForm.form';
import { ConfirmOrderForm } from 'src/app/Shared/Models/Forms/ConfirmOrderForm.form';

//Views
import { OrderAdvancedView } from 'src/app/Shared/Models/Views/Order/OrderAdvancedView.view';

//Components
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';
import { AlertComponent } from 'src/app/Widgets/Other Components/alert/alert.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;

  public order: OrderAdvancedView;

  public feedbackFrom: FormGroup = new FormGroup({
    feedback: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
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
            this.toastrRef.onSuccess('Feedback', 'Feedback sent successfully', 5);
            this.feedbackFrom.reset();
          }
        }, 1500)
      })

    } else {
      this.addFeedbackLoading = false;
      this.markFormAsDirty();
    }
  }

  public onDeletingOrder: boolean = false;
  public deleteOrder(){
    this.globalService.openDialog(AlertComponent,
      {
        title: 'Delete Order',
        message: 'Are you sure you want to delete this order?',
        buttons: [
          { value: 'Delete Order', color: 'red', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
              if(this.onDeletingOrder == false) {
                this.onDeletingOrder = true;
                this.orderService.deleteOrder(this.order.id).subscribe((response: any) => {
                  setTimeout(() => {
                    dialogRef.close();
                    if(!response.error){
                      this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+'/orders']);
                    }
                  }, 3000)

                });

              }
            }
          },
          { value: 'Cancel', color: 'gray', onButtonClick: (dialogRef: any) => { dialogRef.close() } }
        ]
      }, null);
  }


  public onConfirmationOrder: boolean = false;
  public confirmOrder(){
    this.globalService.openDialog(AlertComponent,
      {
        title: 'Order Confirmation',
        message: 'Are you sure you want to proceed with the order?',
        buttons: [
          { value: 'Confirm Order', color: 'blue', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
              if(this.onConfirmationOrder == false) {
                this.onConfirmationOrder = true;
                let form: ConfirmOrderForm = {
                  orderId: this.order.id
                }
                this.orderService.confirmOrder(form).subscribe((response: any) => {
                  setTimeout(() => {
                    dialogRef.close();
                    if(!response.error){
                      this.order = response;
                    }
                  }, 3000)
                });
              }
            }
          },
          { value: 'Cancel', color: 'gray', onButtonClick: (dialogRef: any) => { dialogRef.close() } }
        ]
      }, null);
  }

  private markFormAsDirty() {
    Object.keys(this.feedbackFrom.getRawValue()).forEach(formControlName => {
      this.feedbackFrom.get(formControlName).markAsDirty();
    });
  }
}

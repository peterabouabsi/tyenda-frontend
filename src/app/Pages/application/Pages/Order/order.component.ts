import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//environment
import { environment } from 'src/environments/environments';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { OrderService } from './Services/order.service';

//Forms
import { AddFeedbackForm } from 'src/app/Shared/Models/Forms/AddFeedbackForm.form';
import { ConfirmCompleteOrderForm } from 'src/app/Shared/Models/Forms/ConfirmCompleteOrderForm.form';
import { ApproveRejectForm } from 'src/app/Shared/Models/Forms/ApproveRejectForm.form';

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

  /* ----------- Global Properties */
  public fileBaseUrl: string = environment.fileBaseUrl;
  /* Global Properties ----------- */

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;

  public order: OrderAdvancedView;

  public feedbackFrom: FormGroup = new FormGroup({ feedback: new FormControl('', [Validators.required]) });
  public rejectionForm: FormGroup = new FormGroup({ reason: new FormControl('', [Validators.required]) });

  constructor(private route: ActivatedRoute,
              private location: Location,
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

  public onApprovingRejectingOrder: boolean = false;
  public approveRejectOrder(isApproved: boolean = false, isRejected: boolean = false) {
    this.globalService.openDialog(AlertComponent,
      {
        title: isApproved ? 'Approve Order' : 'Reject Order',
        message: isApproved ? 'Are you sure you want to approve this order?' : 'Are you sure you want to reject this order?',
        inputs: isApproved ? null : [{ type: 'textarea', placeholder: 'Add the reason here ...', formControl: this.rejectionForm.get('reason'), onInput: (value: string) => { this.rejectionForm.get('reason').setValue(value); } }],
        buttons: [
          isApproved ?
            {
              value: 'Approve Order', color: 'blue', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
                if (this.onApprovingRejectingOrder == false) {
                  this.onApprovingRejectingOrder = true;

                  let approveRejectForm: ApproveRejectForm = {
                    orderId: this.order.id,
                    isApproved: isApproved,
                    isRejected: isRejected
                  }

                  this.orderService.approveReject(approveRejectForm).subscribe((response: any) => {
                    setTimeout(() => {
                      dialogRef.close();
                      if (!response.error) {
                        this.order = response;
                        this.onApprovingRejectingOrder = false;
                      }
                    }, 3000)

                  });
                }
              }
            }
            :
            {
              value: 'Reject Order', color: 'red', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
                if(this.rejectionForm.valid){
                  if (this.onApprovingRejectingOrder == false) {
                    this.onApprovingRejectingOrder = true;

                    let approveRejectForm: ApproveRejectForm = {
                      orderId: this.order.id,
                      isApproved: isApproved,
                      isRejected: isRejected,
                      rejectDescription: this.rejectionForm.get('reason').value
                    }

                    this.orderService.approveReject(approveRejectForm).subscribe((response: any) => {
                      setTimeout(() => {
                        dialogRef.close();
                        if (!response.error) {
                          this.order = response;
                          this.onApprovingRejectingOrder = false;
                        }
                      }, 3000)

                    });

                  }
                }

              }
            },
          { value: 'Cancel', color: 'gray', onButtonClick: (dialogRef: any) => { dialogRef.close() } }
        ]
      });
  }

  public onDeletingOrder: boolean = false;
  public deleteOrder() {
    this.globalService.openDialog(AlertComponent,
      {
        title: 'Delete Order',
        message: 'Are you sure you want to delete this order?',
        buttons: [
          {
            value: 'Delete Order', color: 'red', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
              if (this.onDeletingOrder == false) {
                this.onDeletingOrder = true;
                this.orderService.deleteOrder(this.order.id).subscribe((response: any) => {
                  setTimeout(() => {
                    dialogRef.close();
                    if (!response.error) {
                      this.location.back();
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
  public confirmOrder() {
    this.globalService.openDialog(AlertComponent,
      {
        title: 'Order Confirmation',
        message: 'Are you sure you want to proceed with the order?',
        buttons: [
          {
            value: 'Confirm Order', color: 'blue', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
              if (this.onConfirmationOrder == false) {
                this.onConfirmationOrder = true;
                let form: ConfirmCompleteOrderForm = {
                  orderId: this.order.id
                }
                this.orderService.confirmOrder(form).subscribe((response: any) => {
                  setTimeout(() => {
                    dialogRef.close();
                    if (!response.error) {
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

  public onCompletionOrder: boolean = false;
  public completeOrder(){
    this.globalService.openDialog(AlertComponent,
      {
        title: 'Order Confirmation',
        message: 'Are you sure you want to close the order?',
        buttons: [
          {
            value: 'Complete Order', color: 'blue', isLoaderButton: true, onButtonClick: (dialogRef: any) => {
              if (this.onCompletionOrder == false) {
                this.onCompletionOrder = true;
                let form: ConfirmCompleteOrderForm = {
                  orderId: this.order.id
                }
                this.orderService.completeOrder(form).subscribe((response: any) => {
                  setTimeout(() => {
                    dialogRef.close();
                    if (!response.error) {
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

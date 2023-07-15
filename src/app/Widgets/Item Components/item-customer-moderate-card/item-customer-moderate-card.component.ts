import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { ItemCardService } from 'src/app/Widgets/Item Components/Services/item-card.service';

//Forms
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';

//Views
import { CartItemBasicView } from 'src/app/Shared/Models/Views/Cart/CartItemBasicView.view';

@Component({
  selector: 'app-item-customer-moderate-card',
  templateUrl: './item-customer-moderate-card.component.html',
  styleUrls: ['./item-customer-moderate-card.component.scss']
})
export class ItemCustomerModerateCardComponent implements OnInit{

  @Input() data: CartItemBasicView | any;
  @Output() onRemoveEvent = new EventEmitter();

  constructor(private router: Router,
              private itemCardService: ItemCardService) {
  }

  ngOnInit(): void {
  }

  public addRemoveCart(){
    let form: AddRemoveCartForm = {
      itemId: this.data.itemId
    };

    this.itemCardService.addRemoveCart(form).subscribe((response: any) => {
      if(!response.error){
        this.onRemoveEvent.emit();
      }
    });
  }

  public orderNow(){
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER+"request-order/"+this.data.id]);
  }

}

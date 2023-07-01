import { Component, OnInit } from '@angular/core';

//Config
import { CartConfig } from 'src/app/Shared/Models/Config/Cart/CartConfig.config';

//Views
import { CartStoreBasicView } from 'src/app/Shared/Models/Views/Cart/CartStoreBasicView.view';
import { CartItemBasicView } from 'src/app/Shared/Models/Views/Cart/CartItemBasicView.view';

//Services
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  //active index: store = 1 ; item = 2
  public activeFilterIndex: number = 1;

  public cartResultConfig: CartConfig<CartStoreBasicView | CartItemBasicView> = {data: [], top: 10, loaded: false};

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.readData(this.cartResultConfig.top);
  }

  /*--------- Read Stores/Items in your cart based on the activeIndex -------------*/
  public readData(top: number){
    let type = "";
    if(this.activeFilterIndex == 1) type = "Stores"
    if(this.activeFilterIndex == 2) type = "Items"

    this.cartService.readCart(type, top).subscribe((response: any) => {
      if(!response.error){
        this.cartResultConfig = {data: response, top: top, loaded: true};
      }
    });
  }
  /*--------- Read Stores/Items in your cart based on the activeIndex -------------*/

  /*--------- Read 10 new data -------------*/
  public viewMore(){
    this.readData(this.cartResultConfig.top + 10)
  }
  /*--------- Read 10 new data -------------*/

  /*----------- Switch between Store/Item filter options ------------*/
  public setFilterIndex(index: number) {
    this.activeFilterIndex = index;
    this.cartResultConfig.top = 10;
    this.readData(this.cartResultConfig.top)
  }
  /*----------- Switch between Store/Item filter options ------------*/

}

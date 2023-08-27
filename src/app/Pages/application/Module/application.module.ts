//Modules
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/Shared/Modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/Shared/Modules/shared/shared.module';

/* ----------------------------------------------------------------------------------------------- */

//Services
import { CustomerHomeService } from '../Pages/Customer/Pages/Home/Services/customer-home.service';
import { CustomerOrdersService } from '../Pages/Customer/Pages/Orders/Services/customer-orders.service';
import { CustomerSearchService } from '../Pages/Customer/Pages/Search/Services/customer-search.service';
import { CartService } from '../Pages/Customer/Pages/Cart/Services/cart.service';
import { CustomerItemService } from '../Pages/Customer/Pages/Item/Services/customer-item.service';
import { RequestOrderService } from '../Pages/Customer/Pages/Request Order/Services/request-order.service';
import { StoreHomeService } from '../Pages/Store/Pages/Home/Services/store-home.service';
import { AddUpdateItemService } from '../Pages/Store/Pages/Add-Update Item/services/add-update-item.service';
import { NotificationService } from 'src/app/Shared/Services/Notification/notification.service';
/* ----------------------------------------------------------------------------------------------- */

//Components
import { ApplicationComponent } from '../Pages/application.component';
import { ChangePwdComponent } from 'src/app/Widgets/Navbar Components/change-pwd/change-pwd.component';
import { EditCustomerComponent } from 'src/app/Widgets/Navbar Components/edit-customer/edit-customer.component';
import { EditStoreComponent } from 'src/app/Widgets/Navbar Components/edit-store/edit-store.component';

/* ----------------------------------------------------------------------------------------------- */

import { CustomerMainComponent } from '../Pages/Customer/customer-main.component';
  import { NavbarCustomerComponent } from 'src/app/Widgets/Navbar Components/navbar-customer/navbar-customer.component';

  import { HomeCustomerComponent } from '../Pages/Customer/Pages/Home/home-customer.component';
  import { SearchComponent } from '../Pages/Customer/Pages/Search/search.component';
  import { OrdersCustomerComponent } from '../Pages/Customer/Pages/Orders/orders-customer.component';
  import { CartComponent } from '../Pages/Customer/Pages/Cart/cart.component';
  import { CustomerItemComponent } from '../Pages/Customer/Pages/Item/customer-item.component';
    import { CustomerItemDescriptionComponent } from '../Pages/Customer/Pages/Item/Components/customer-item-description/customer-item-description.component';
    import { CustomerItemCommentsComponent } from '../Pages/Customer/Pages/Item/Components/customer-item-description/Components/customer-item-comments/customer-item-comments.component';
    import { CustomerItemOrdersComponent } from '../Pages/Customer/Pages/Item/Components/customer-item-orders/customer-item-orders.component';
  import { RequestOrderComponent } from '../Pages/Customer/Pages/Request Order/request-order.component';

/* ----------------------------------------------------------------------------------------------- */

import { StoreMainComponent } from '../Pages/Store/store-main.component';
  import { NavbarStoreComponent } from 'src/app/Widgets/Navbar Components/navbar-store/navbar-store.component';

  import { HomeStoreComponent } from '../Pages/Store/Pages/Home/home-store.component';
  import { OrdersStoreComponent } from '../Pages/Store/Pages/Orders/orders-store.component';
  import { StoreItemsComponent } from '../Pages/Store/Pages/Items/store-items.component';
  import { StoreItemComponent } from '../Pages/Store/Pages/Item/store-item.component';
  import { AddUpdateItemComponent } from '../Pages/Store/Pages/Add-Update Item/add-update-item.component';
  import { MyStoreProfileComponent } from '../Pages/Store/Pages/Profile/my-store-profile.component';

/* ----------------------------------------------------------------------------------------------- */

import { StoreProfileComponent } from '../Pages/Store Profile/store-profile.component';
import { OrderComponent } from '../Pages/Order/order.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    ChangePwdComponent,
    EditCustomerComponent,
    EditStoreComponent,
    CustomerMainComponent,
      //Navbar
      NavbarCustomerComponent,
      //Customer Pages
      HomeCustomerComponent,
      SearchComponent,
      OrdersCustomerComponent,
      CartComponent,
      CustomerItemComponent,
        CustomerItemDescriptionComponent,
        CustomerItemCommentsComponent,
        CustomerItemOrdersComponent,
      RequestOrderComponent,

    StoreMainComponent,
      //Navbar
      NavbarStoreComponent,
      //Store Pages
      HomeStoreComponent,
      OrdersStoreComponent,
      MyStoreProfileComponent,
      StoreItemsComponent,
      StoreItemComponent,
      AddUpdateItemComponent,

    StoreProfileComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    SharedModule
  ],
  exports: [
    ApplicationComponent,
    ChangePwdComponent,
    EditCustomerComponent,
    EditStoreComponent,
    CustomerMainComponent,
      //Navbar
      NavbarCustomerComponent,
      //Customer Pages
      HomeCustomerComponent,
      SearchComponent,
      OrdersCustomerComponent,
      CartComponent,
      CustomerItemComponent,
        CustomerItemDescriptionComponent,
        CustomerItemOrdersComponent,
        CustomerItemCommentsComponent,
      RequestOrderComponent,

    StoreMainComponent,
      //Navbar
      NavbarStoreComponent,
      //Store Pages
      HomeStoreComponent,
      OrdersStoreComponent,
      MyStoreProfileComponent,
      StoreItemsComponent,
      StoreItemComponent,
      AddUpdateItemComponent,

    StoreProfileComponent,
    OrderComponent
  ],
  providers: [
    CustomerHomeService,
    CustomerOrdersService,
    CustomerSearchService,
    CartService,
    CustomerItemService,
    RequestOrderService,
    StoreHomeService,
    AddUpdateItemService,
    NotificationService,
    DecimalPipe
  ]
})

export class ApplicationModule { }

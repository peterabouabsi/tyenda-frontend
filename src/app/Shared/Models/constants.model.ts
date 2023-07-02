
export class Constants{

  constructor() {
  }

  public static get ROLE_CUSTOMER(){
    return 'Customer';
  }
  public static get ROLE_STORE(){
    return 'Store';
  }
  public static get STORAGE_SESSION(){
    return '_session';
  }
  public static get STORAGE_STORE_DATA(){
    return '_storedata';
  }
  public static get AUTH_MAIN_ROUTE(){
    return '/authentication/';
  }
  public static get APP_MAIN_ROUTE_CUSTOMER(){
    return '/application/customer/';
  }
  public static get APP_MAIN_ROUTE_STORE(){
    return '/application/store/';
  }

  public static get ITEM_TYPE(){
    return 'Item';
  }
  public static get STORE_TYPE(){
    return 'Store';
  }

}

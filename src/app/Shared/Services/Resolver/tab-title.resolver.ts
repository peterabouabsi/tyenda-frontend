import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

export const StoreNameResolver: ResolveFn<string> = async (route, state) => {
  let globalService = inject(GlobalService);
  let storeId = route.paramMap.get('storeId');
  let response = await globalService.getStoreName(storeId).toPromise();

  return response.value;
};

export const ItemNameResolver: ResolveFn<string> = async (route, state) => {
  let globalService = inject(GlobalService);
  let itemId = route.paramMap.get('itemId');
  let response = await globalService.getItemName(itemId).toPromise();

  return response.value;
};

export const OrderReferenceResolver: ResolveFn<string> = async (route, state) => {
  let globalService = inject(GlobalService);
  let orderId = route.paramMap.get('orderId');
  let response = await globalService.getOrderReference(orderId).toPromise();

  return response.value;
};

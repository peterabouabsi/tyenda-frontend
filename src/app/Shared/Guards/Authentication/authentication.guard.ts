import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';

//Constants
import { Constants } from '../../Models/constants.model';

//Services
import { GlobalService } from './../../Services/Global/global.service';

export const authenticationGuard: CanActivateChildFn = async (route, state) => {
  const globalService = inject(GlobalService);

  const accessToken: string = globalService.getStorage(Constants.STORAGE_SESSION).accessToken;

  if (accessToken && accessToken !== '') {
    const response: any = await globalService.isTokenExpired(accessToken).toPromise();

    return !response.isExpired;
  } else {
    return false;
  }
};

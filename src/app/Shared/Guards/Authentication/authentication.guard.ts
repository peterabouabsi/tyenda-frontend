import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

//Constants
import { Constants } from '../../Models/constants.model';

//Services
import { GlobalService } from './../../Services/Global/global.service';

export const authenticationGuard: CanActivateChildFn = async (route, state) => {
  const globalService = inject(GlobalService);
  const router = inject(Router)

  const session = globalService.getStorage(Constants.STORAGE_SESSION);

  if(session){
    const accessToken: string = session.accessToken;

    if (accessToken && accessToken !== '') {
      const response: any = await globalService.isTokenExpired(accessToken).toPromise();
      if(response.error){
        globalService.deleteStorage(Constants.STORAGE_SESSION);
        return false;
      }
      return !response.isExpired;
    } else {
      return false;
    }

  }else{
    router.navigate(['/authentication']);
    return false;
  }

};

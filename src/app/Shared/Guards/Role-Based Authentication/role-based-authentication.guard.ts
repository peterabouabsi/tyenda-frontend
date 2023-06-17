import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

//Services
import { GlobalService } from '../../Services/Global/global.service';

export const roleBasedAuthenticationGuard: CanActivateFn = (route, state) => {
  let globalService = inject(GlobalService);
  let roles: any[] = route.data['roles'];
  let permission = false;

  if(roles.length == 0){
    permission = true;

  }else{
    globalService.getAccountRole().subscribe((response: any) => {
      if(!response.error){

        if(roles.includes(response.role)){
          permission = true;
        }
      }
      console.log("AuthenticationGuard Role: "+response.role);
    });
  }

  return permission;

};

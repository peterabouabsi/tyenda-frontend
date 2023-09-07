import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

// Services
import { GlobalService } from '../../Services/Global/global.service';

export const roleBasedAuthenticationGuard: CanActivateFn = async (route, state) => {
  let globalService = inject(GlobalService);
  let roles: string[] = route.data['roles'];

  let permission = false;

  if (roles.length == 0) {
    permission = true;
  } else {
    const response = await globalService.getAccountRole().toPromise();

    if (!response.error && roles.includes(response.role)) {
      permission = true;
    }
  }

  return permission;
};
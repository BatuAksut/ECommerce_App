import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/common/auth.service'; // Yolunu kontrol et

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastrService = inject(ToastrService);
  const authService = inject(AuthService);


  if (!authService.identityCheck()) {
    
  
    localStorage.removeItem("accessToken"); 

    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    toastrService.warning("You must be logged in to access this page.", "Unauthorized Access");
    
    return false;
  }

  return true;
};
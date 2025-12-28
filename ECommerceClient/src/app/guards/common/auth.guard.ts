import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService(); 
  const toastrService = inject(ToastrService);

  const token = localStorage.getItem("accessToken");


  if (!token || jwtHelper.isTokenExpired(token)) {
    
    localStorage.removeItem("accessToken"); 

    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    toastrService.error("You must be logged in to access this page.", "Unauthorized Access");
    

    
    return false;
  }


  return true;
  
};
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }


  identityCheck(): boolean {
    const token = localStorage.getItem("accessToken");

  
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true; 
    }

    _isAuthenticated = token != null && !expired;
    return _isAuthenticated;
  }


  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}


export let _isAuthenticated: boolean = false;
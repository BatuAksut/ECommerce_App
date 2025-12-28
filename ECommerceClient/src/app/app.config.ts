import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

// 1. Token'ı localStorage'dan okuyan fonksiyon
export function tokenGetter() {
  return localStorage.getItem("accessToken");
}

export const appConfig: ApplicationConfig = {
  providers: [
    // 🔹 Performans iyileştirmesi
    provideZoneChangeDetection({ eventCoalescing: true }),

    // 🔹 Router ayarları
    provideRouter(routes),

    // 🔹 Toastr için gerekli animasyonlar
    provideAnimations(),

    // 🔹 Toastr konfigürasyonu
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      progressBar: true,
      preventDuplicates: true,
      closeButton: true,
    }),

    // 🔹 HTTP Client ve Interceptor Desteği (Önemli!)
    // withInterceptorsFromDi() sayesinde JwtModule token'ı otomatik header'a ekleyebilir.
    provideHttpClient(withInterceptorsFromDi()),

    // 🔹 JWT 
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,

          allowedDomains: ["localhost:7287"], 
          disallowedRoutes: [] 
        }
      })
    ),

    // 🔹 Custom Base URL Provider
    { provide: "baseUrl", useValue: "https://localhost:7287/api", multi: true },
  ]
};
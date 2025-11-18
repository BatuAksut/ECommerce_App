import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

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
  
  ]
};

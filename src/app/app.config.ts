import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es-PE';
import { AuthInterceptor } from './core/auth.interceptor';
import { AUTH_INITIALIZER } from './core/auth-initializer.provider';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SpanishPaginatorIntl } from './core/spanish.paginator';

registerLocaleData(localeEs, 'es-PE');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideAnimations(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-PE' },
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AUTH_INITIALIZER,
    {
      provide: MatPaginatorIntl,
      useClass: SpanishPaginatorIntl
    }
  ]
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provides routing configuration
    provideHttpClient(), // Provides HttpClient for backend communication
    importProvidersFrom(FormsModule, BrowserAnimationsModule) // Imports FormsModule and animations
  ]
};
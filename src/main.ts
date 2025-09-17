import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [provideAnimations(),
    provideRouter(routes),
    provideHttpClient()
  ]
});

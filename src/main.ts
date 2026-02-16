import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Routes,
} from '@angular/router';
import { Component } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '1-model',
    pathMatch: 'full',
  },
  {
    path: '1-model',
    loadComponent: () =>
      import('./demos/1-model/model-demo.component').then(
        (m) => m.ModelDemoComponent
      ),
  },
  {
    path: '2-rxjs-leak',
    loadComponent: () =>
      import('./demos/2-rxjs-leak/rxjs-leak-demo.component').then(
        (m) => m.RxjsLeakDemoComponent
      ),
  },
  {
    path: '3-signals',
    loadComponent: () =>
      import('./demos/3-signals/signals-demo.component').then(
        (m) => m.SignalsDemoComponent
      ),
  },
  {
    path: '4-service-based',
    loadComponent: () =>
      import('./demos/4-signal-store/service-based.component')
        .then(m => m.ServiceBasedComponent),
  },
  {
    path: '4-store-based',
    loadComponent: () =>
      import('./demos/4-signal-store/store-based.component')
        .then(m => m.StoreBasedComponent),
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "main.html",
  styles: [
    `
      .active-link {
        font-weight: bold;
        text-decoration: underline;
      }
    `,
  ],
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { Component } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'model',
    pathMatch: 'full',
  },
  {
    path: '1-model',
    loadComponent: () =>
      import('./demos/1-model/model-demo.component').then(
        (m) => m.ModelDemoComponent
      ),
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div style="font-family: Arial, sans-serif; padding: 32px;">
      <h1>Angular Signals — Why should I care?</h1>

      <nav style="margin-top: 24px;">
        <a routerLink="/1-model" style="font-size: 18px;">
          1. Model-based state (baseline)
        </a>
      </nav>

      <hr style="margin: 24px 0;" />

      <router-outlet />
    </div>
  `,
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from './store';

@Component({
  selector: 'app-store-based',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-based.component.html',
})
export class StoreBasedComponent {
  store = inject(CartStore);

  load(): void {
    this.store.load();
  }
}

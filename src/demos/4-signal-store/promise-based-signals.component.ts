import { ChangeDetectorRef, Component, NgZone, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { fetchCart } from './api';

@Component({
  selector: 'app-promise-based',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promise-based-signals.component.html',
})
export class PromiseBasedComponent {
  loading = signal(false);
  fetchedAt = signal<string | null>(null);
  items = signal<Array<{ id: number; name: string; price: number }>>([]);

  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0)
  );

  private zone = inject(NgZone);

  async loadSignals(): Promise<void> {
    this.loading.set(true);

    try {
      const dto = await firstValueFrom(fetchCart());
      this.fetchedAt.set(dto.fetchedAt);
      this.items.set(dto.items);
    } catch (error) {
      console.error('Failed to load cart', error);
      this.fetchedAt.set(null);
      this.items.set([]);
    } finally {
      this.loading.set(false);
    }
  }
}
import { ChangeDetectorRef, Component, NgZone, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { fetchCart } from './api';

@Component({
  selector: 'app-promise-based',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promise-based.component.html',
})
export class PromiseBasedComponent {
  // private cdr = inject(ChangeDetectorRef);

  loading = false;
  fetchedAt: string | null = null;
  items: Array<{ id: number; name: string; price: number }> = [];

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  async load(): Promise<void> {
    this.loading = true;
    // this.cdr.detectChanges();

    try {
      const dto = await firstValueFrom(fetchCart());
      console.log("Yes, it returned!!!")

      this.fetchedAt = dto.fetchedAt;
      this.items = dto.items;
    } catch (error) {
      console.error('Failed to load cart', error);
      this.fetchedAt = null;
      this.items = [];
    } finally {
      this.loading = false;
      //this.cdr.detectChanges();
    }
  }

  pointlessCode() {
    
  }
}
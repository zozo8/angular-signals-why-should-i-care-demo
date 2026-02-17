import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model-demo.component.html',
})
export class ModelDemoComponent {
  price = 100;
  tax = 23;

  totalPrice = this.price + this.tax;

  increasePrice(): void {
    this.price += 10;

    // BUG: totalPrice is not updated here
    // this.totalPrice = this.price + this.tax;
  }

  increaseTax(): void {
    this.tax += 1;

    this.totalPrice = this.price + this.tax;
  }

  /*
  "Fix": manually synchronize state and force UI refresh
  */

  private cdr = inject(ChangeDetectorRef);

  increasePriceFixed(): void {
    this.price += 10;

    this.totalPrice = this.price + this.tax;

    this.cdr.detectChanges();
  }
}

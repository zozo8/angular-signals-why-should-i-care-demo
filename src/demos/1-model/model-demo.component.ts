import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model-demo.component.html',
})
export class ModelDemoComponent {
  price: number = 100;
  tax: number = 23;

  get totalPrice(): number {
    return this.price + this.tax;
  }

  increasePrice(): void {
    this.price += 10;
  }

  increaseTax(): void {
    this.tax += 1;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

// Shared source and shared counters
const increment$ = new Subject<void>();

let safeCounterGlobal = 0;
let leakyCounterGlobal = 0;

@Component({
  selector: 'app-rxjs-leak-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-leak-demo.component.html',
})
export class RxjsLeakDemoComponent implements OnInit, OnDestroy {
  safeCounter = 0;
  leakyCounter = 0;

  private safeSub?: Subscription;

  ngOnInit(): void {
    // Correct subscription
    this.safeSub = increment$.subscribe(() => {
      safeCounterGlobal++;
      this.safeCounter = safeCounterGlobal;
    });

    // Leaky subscription
    increment$.subscribe(() => {
      leakyCounterGlobal++;
      this.leakyCounter = leakyCounterGlobal;
    });
  }

  ngOnDestroy(): void {
    this.safeSub?.unsubscribe();
    // Leaky subscription remains active
  }

  increment(): void {
    increment$.next();

    // Refresh displayed values
    this.safeCounter = safeCounterGlobal;
    this.leakyCounter = leakyCounterGlobal;
  }
}

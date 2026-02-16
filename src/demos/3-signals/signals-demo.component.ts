import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signals-demo',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './signals-demo.component.html',
})
export class SignalsDemoComponent {

    constructor() {
        effect(() => {
            // No subscribe. No unsubscribe. Angular tracks dependencies automatically.
            const counter = this.counter();

            // computed behaves like a cached derived value
            const doubled = this.doubled();

            // any dependency change re-runs this effect
            const other = this.otherCounter();

            console.log(
                `Main counter is: ${counter}, doubled is: ${doubled}, other counter is: ${other}`
            );
        });
    }

    counter = signal(0);
    otherCounter = signal(0);

    doubled = computed(() => this.counter() * 2);

    increment(): void {
        this.counter.update(c => c + 1);
    }

    incrementOther(): void {
        this.otherCounter.update(c => c + 1);
    }

    reset(): void {
        this.counter.set(0);
    }
}

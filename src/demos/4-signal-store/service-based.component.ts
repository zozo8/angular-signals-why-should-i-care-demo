import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api-service';

@Component({
    selector: 'app-service-based',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './service-based.component.html',
})
export class ServiceBasedComponent {
    loading$ = this.api.loading$;
    cart$ = this.api.cart$;

    constructor(private api: ApiService) { }

    load(): void {
        this.api.loadCart();
    }
}

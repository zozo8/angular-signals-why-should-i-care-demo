import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { fetchCart } from './api';

export type UiCart = {
    fetchedAt: string;
    lines: Array<{ label: string; price: number }>;
    total: number;
};

@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loading$ = this.loadingSubject.asObservable();

    private readonly cartSubject = new BehaviorSubject<UiCart | null>(null);
    readonly cart$ = this.cartSubject.asObservable();

    loadCart(): void {
        this.loadingSubject.next(true);

        fetchCart()
            .pipe(
                map((dto) => {
                    const lines = dto.items.map((x) => ({ label: x.name, price: x.price }));
                    const total = lines.reduce((sum, x) => sum + x.price, 0);

                    return {
                        fetchedAt: dto.fetchedAt,
                        lines,
                        total,
                    } satisfies UiCart;
                }),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((cart) => this.cartSubject.next(cart));
    }
}

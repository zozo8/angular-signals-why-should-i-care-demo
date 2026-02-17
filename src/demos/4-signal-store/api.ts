import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type ApiCartDto = {
    fetchedAt: string;
    items: Array<{ id: number; name: string; price: number }>;
};

export function fetchCart(): Observable<ApiCartDto> {
    console.log("Cart loading requested")
    const dto: ApiCartDto = {
        fetchedAt: new Date().toISOString(),
        items: [
            { id: 1, name: 'Keyboard', price: 100 },
            { id: 2, name: 'Mouse', price: 50 },
            { id: 3, name: 'Monitor', price: 300 },
        ],
    };

    return of(dto).pipe(delay(1500));
}

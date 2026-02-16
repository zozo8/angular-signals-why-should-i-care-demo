import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, map, pipe, switchMap, tap } from 'rxjs';
import { fetchCart } from './api';
import { setEntities, withEntities } from '@ngrx/signals/entities';

export type CartItem = { id: number; name: string; price: number };

export const CartStore = signalStore(
    { providedIn: 'root' },

    withState({
        loading: false,
        fetchedAt: ""
    }),
    withEntities<CartItem>(),
    withComputed((s) => ({
        total: computed(() => s.entities().reduce((acc, x) => acc + x.price, 0)),
    })),
    withMethods((s) => ({
        load: rxMethod<void>(
            pipe(
                tap(() => patchState(s, { loading: true })),
                switchMap(() =>
                    fetchCart().pipe(
                        tap((response) => {
                            patchState(s, { fetchedAt: response.fetchedAt })
                            patchState(s, setEntities(response.items))
                        }),
                        finalize(() => patchState(s, { loading: false }))
                    )
                )
            )
        ),
    }))
);

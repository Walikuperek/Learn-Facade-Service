import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

/**
 * Abstract class for RxJS state service.
 */
export abstract class StateService<T> {
    private _state$: BehaviorSubject<T>;

    protected constructor(initialState: T) {
        this._state$ = new BehaviorSubject<T>(initialState);
    }

    public select<K>(mapFn: (state: T) => K): Observable<K> {
        return this._state$.asObservable().pipe(
            map((state: T) => mapFn(state)),
            distinctUntilChanged(),
        );
    }

    public setState(newState: Partial<T>) {
        this._state$.next({...this.state, ...newState});
    }

    public get state(): T {
        return this._state$.getValue();
    }
}

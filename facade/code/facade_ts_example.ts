import {Injectable} from '@angular/core';
import {StateService} from './state-service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

interface ITodo {
    id: number;
    title: string;
    text: string;
    isDone: boolean;
}

interface ITodoState {
    todos: ITodo[];
    selectedTodoId: number | null;
}

const initialState: ITodoState = {
    todos: [],
    selectedTodoId: null
};

@Injectable({ providedIn: 'root' })
/**
 * Example of state service.
 */
export class TodosStateService extends StateService<ITodoState> {
    /** Not multicasting */
    todosUnicast$: Observable<ITodo[]> = this.select(state => state.todos);

    /** Multicasting */
    todos$: Observable<ITodo[]> = this.select(state => state.todos).pipe(
        shareReplay({refCount: true, bufferSize: 1})
    );

    selectedTodo$: Observable<ITodo | undefined> = this.select(
        state => state.todos.find(todo => todo.id === state.selectedTodoId)
    );

    constructor() {
        super(initialState);
    }

    addTodo(todo: ITodo) {
        this.setState({todos: [...this.state.todos, todo]});
    }

    selectTodo(todo: ITodo) {
        this.setState({selectedTodoId: todo.id});
    }
}

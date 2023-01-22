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
export class TodosStore extends StateService<ITodoState> {
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

@Injectable({ providedIn: 'root' })
/**
 * Example of facade.
 */
export class TodosFacade {
    constructor(public todosStore: TodosStore) {}
    
    addTodo(todo: ITodo) {
        this.todosStore.addTodo(todo);
    }
    
    selectTodo(todo: ITodo) {
        this.todosStore.selectTodo(todo);
    }  
}

/*
    To save data:

    class Component {
        constructor(public todosFacade: TodosFacade) {}
        
        onAddTodo(todo: ITodo) {
            this.todosFacade.addTodo(todo);
        }
        
        // ...
    }
    
    To read data:

    class Component {
        viewModel$: Observable<{todosCount: number; todos: ITodo[]}>
    
        constructor(public todosFacade: TodosFacade) {
            this.viewModel$ = this.todosFacade.todosStore.todos$.pipe(
                map(todos => ({todosCount: todos.length, todos}))
            );
        }
        
        // ...
    }
    
    In HTML
    
    <ng-container *ngIf="viewModel$ | async as vm">
        <app-counter>{{vm.todosCount}}</app-counter>
        <app-todo *ngFor="let todo of vm.todos" [todo]="todo"></app-todo>
    </ng-container>
*/

# Facade service in Angular 2+

* [Getting started](#getting-started)
    - [Steps to implement facade](#steps-to-implement-facade)
* [How to save data](#how-to-save-data)
* [How to read data from Facade service](#how-to-read-data-from-facade-service)
    - [Use data in HTML](#use-data-in-html)
    - [Use data in TypeScript](#use-data-in-typescript)
* [View Model Pattern](#view-model-pattern)
    - [Usage in component HTML](#usage-in-component-html)
    - [Usage in component TS](#usage-in-component-ts)
* [Best practices](#best-practices)
* [When to use Facade service](#when-to-use-facade-service)

## Getting started
In this project we will learn a `Facade` which can refer to multiple `Store` classes or can be single `Store` class.
It will help with chunking data, managing models and simpler api.

### Steps to implement facade:
1. Create `interface` and `service` that will extend `StateService<T>` class
```typescript
interface StoreState {
    data: string | null;
}

@Injectable({providedIn: 'root'})
export class Store extends StateService<StoreState> {
    super({data: null}) // Initialize default state
}
```

2. Add update method to `Store`
```typescript
@Injectable({providedIn: 'root'})
export class Store extends StateService<StoreState> {
    
    updateData(data: string): void {
        this.setState({data}); // Will update data
    }
}
```

3. Create `handle` to get data observable
```typescript
@Injectable({providedIn: 'root'})
export class Store extends StateService<StoreState> {
    data$ = this.select(state => state.data);
}
```

4. Create `Facade` service that have `Store` as a dependency
```typescript
@Injectable({providedIn: 'root'})
export class Facade {
    constructor(
        public store: Store
    ) {}
}
```

5. Create method that will update state in store
```typescript
@Injectable({providedIn: 'root'})
export class Facade {
    
    updateData(data: string): void {
        this.store.updateData(data);
    }
}
```

6. You have made your first `Facade` service
***

## How to save data
```typescript
export class TodosStateStore extends StateService<TodoState> {
    constructor() {
        super({todos: []}); // initialize default state
    }

    addTodo(todo: Todo) {
        this.setState({todos: [...this.state.todos, todo]}); // pass partial state inside {}
    }
}
```

## How to read data from Facade service

```typescript

// If TodosStateStore not provides already selected state
export class TodosFacade {
    todos$ = this.todosStateStore.select(state => state.todos); // use to read state
    doneTodos$ = this.todosStateStore.select(state => state.todos).pipe(
        map(todos => todos.filter(todo => todo.isDone))
    ); // or use to read state and transform it
    
    constructor(public todosStateStore: TodosStateStore) {}
}

// If TodosStateStore provides already selected state
class Component {
    constructor(public facade: TodosFacade) {
        this.todos$ = this.facade.todoStore.todos$
    }
}

// And simpler a lot facade
class Facade {
    constructor(public todosStateStore: TodosStateStore) {} // public is very important!
}
```

### Use data in HTML
```html
<!-- Regular approach with concrete observable -->
<ng-container *ngIf="todosFacade.todos$ | async as todos">
    <app-todo *ngFor="let todo of todos" [todo]="todo"></app-todo>
</ng-container>
```

### Use data in TypeScript 
```typescript
// With regular subscribe
this.todosFacade.todos$.subscribe(todos => {
    // do something with todos
});

// Get currently stored value
const currentTodos = this.todosFacade.state.todos
```

## View Model Pattern
View model helps with combining data into single object

### Usage in component TS
```typescript
// With view model display approach
this.viewModel$ = combineLatest([this.todosFacade.todos$, this.todosFacade.selectedTodoId$])
    .pipe(map([todos, selectedTodoId]) => ({todos, selectedTodoId}))
```

### Usage in component HTML
```html
<!-- Approach with viewModel$ -->
<ng-container *ngIf="viewModel$ | async as vm">
    <app-selected-todo-modal [selectedTodoId]="vm.selectedTodoId"></app-selected-todo-modal>
    <app-todo *ngFor="let todo of vm.todos" [todo]="todo"></app-todo>
</ng-container>
```

## Best practices
* Try to create a facade that encapsulates data that is connected.

* Try to keep as simple api as possible.

* Try to update state in single main view component.


## When to use Facade service
##### Will you
struggle with combining data from multiple components?

##### Will you
work on a view with multiple selects/filters/inputs/checkboxes/etc?

##### Will you have BIG view component and
struggle with combining components data into smaller packages with simple and enjoyable public API?

##### Will help with
components with hundreds of lines of code that are just variable initializations and weird data transformations

##### And lastly
*It helps with getting data, aggregating data into smaller packages, refreshing it, reacting to this data, etc. Because business always makes it hard, so you can react to this data and fetch anywhere...*
***
**Next Step** 
* [View Component with Facade](https://github.com/Walikuperek/Learn-Facade-Service/tree/master/lib-usage-example/create-view)

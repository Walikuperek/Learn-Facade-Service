# Facade service in Angular 2+

* [Getting started](#getting-started)
    - [Steps to implement facade](#steps-to-implement-facade)
* [When to use Facade service](#when-to-use-facade-service)
* [How to save data](#how-to-save-data)
* [How to read data from Facade service](#how-to-read-data-from-facade-service)
* [Best practices](#best-practices)

## Getting started
In this project we will learn a `Facade` which can refer to multiple `Store` classes or single `Store` service.
It will help with chunking data, managing models and simpler api.

### Steps to implement facade:
1. Create `service` that will extend `StateService<T>` class
2. Name `Store` - we will call it `Store` because it will contain `State` of your `Facade`
3. Create `Facade` service that have `Store` as a dependency `constructor(public store: Store)`
4. Create method that will update state in store
5. Use `State.Service.select(state => state.property)` to get data from store
6. You have made your first `Facade` service

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
export class TodosFacade {
    todos$ = this.todosStateStore.select(state => state.todos); // use to read state
    
    doneTodos$ = this.todosStateStore.select(state => state.todos).pipe(
        map(todos => todos.filter(todo => todo.isDone))
    ); // or use to read state and transform it
    
    constructor(public todosStateStore: TodosStateStore) {
    }
}
```

```angular2html
Then Inside component
<ng-container *ngIf="todosFacade.todos$ | async as todos">
    <app-todo *ngFor="let todo of todos" [todo]="todo"></app-todo>
</ng-container>

Or in TS
this.todosFacade.todos$.subscribe(todos => {
    // do something with todos
});

const currentTodos = this.todosFacade.state.todos // or get state directly
```

## Best practices
* Try to create a facade that encapsulates data that is connected.

* Try to keep as simple api as possible.

* Try to update state in single main view component.
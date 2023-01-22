# Models

Example of models used in the assignment create view wizard.
***
## Folder structure should look like
```
models
├── assignment.model.ts
├── ...
└── index.ts
```
***
## Good practices
* Remember that models are used everywhere in the application.

* Add specific methods to the model if needed.
```typescript
export class Assignment {
    // Example with counting each word in the title if some statistics needed
    get titleWordCount(): number {
        return this.title.split(' ').length;
    }
    // ...
}
```

* Don't forget that model can be something small e.g.
```typescript
// /models/something-data.factory.ts
export const SomethingDataFactory = (id: string, name: string): SomethingData => {
    return { id, name };
}

// /models/something-data.model.ts
export class SomethingData {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
```

* Use your models in your components/services and reduce type problems ;)
```typescript
class Component {
    // Bad
    public onSomethingClicked(event: {id: string, name: string}) {
        // This data should be named and modeled
        const data = {
            id: event.id,
            name: event.name,
        };
        this.doSomething(data);
    }
    
    // Good
    public refactoredWithClassModel(event: {id: string, name: string}) {
        const {id, name} = event;
        this.doSomething(new SomethingData(id, name));
    }
    public refactoredWithFactoryModel(event: {id: string, name: string}) {
        const {id, name} = event;
        this.doSomething(SomethingDataFactory(id, name));
    }
}
```

* Factory is very useful when you need to create a model from a different source e.g. from a database.
```typescript
// /models/something-data.factory.ts

export const ClassSomethingDataFactory = (id: string, name: string, isWeirdSettingOn: boolean): SomethingData => {
    // Imagine here some logic that is needed to create the object
    if (isWeirdSettingOn) {
        return new SomethingData(id, name.split('__')[0]);
    }
    return new SomethingData(id, name);
}
```

* Each model should be exported from `index.ts` &rarr; will help with importing them in other places.
```typescript
// /models/index.ts

export * from './assignment.model';
// ...
```

***

**Next step**
[Services](https://github.com/Walikuperek/Learn-Facade-Service/tree/master/lib-usage-example/create-view/services)

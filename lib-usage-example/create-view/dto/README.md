# DTOs

This folder contains the example DTOs for the `create-view` library.

DTO - Data Transfer Object, used as a model mapper.

Example:
```typescript
export class CreateAssignmentDto {
    // ...

    text_description: string;
    // Example - Backend uses snake_case to create assignment, Assignment model uses camelCase

    constructor(assignment: Assignment) {
        this.text_description = assignment.description; // See the comment above
        // DTOs helps to avoid typos in communication with the backend (and between backends is used as well)
    }
}
```


*Copilot: DTOs are useful when you want to create a new object based on an existing one, changing only some of its properties.*

```
dto
├── create-assignment.dto.ts
├── ...
└── index.ts
```

## Good practices
* Use DTOs to map your model to the model that backend accepts.

* Use DTOs to map response from server to your model.

* Export from index.ts - will help with importing them in other places.

```typescript
// /dto/index.ts

export * from './create-assignment.dto'
```

***

**Next step**
* [Enums](https://github.com/Walikuperek/Learn-Facade-Service/tree/master/lib-usage-example/create-view/enums)

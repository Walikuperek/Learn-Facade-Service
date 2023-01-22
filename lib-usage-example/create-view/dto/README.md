# DTOs

This folder contains the example DTOs for the `create-view` library.

DTO - Data Transfer Object, used as a model mapper.


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

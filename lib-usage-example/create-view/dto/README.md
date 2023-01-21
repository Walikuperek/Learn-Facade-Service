# DTOs

This folder contains the example DTOs for the `create-view` library.

*Copilot: DTOs are useful when you want to create a new object based on an existing one, changing only some of its properties.*

```
dto
├── create-assignment.dto.ts
├── ...
└── index.ts
```

## Good practices
* Export from index.ts - will help with importing them in other places.

```typescript
// /dto/index.ts

export * from './create-assignment.dto'
```

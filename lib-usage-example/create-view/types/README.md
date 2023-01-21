# Types

This folder contains the example types for the `create-view` library.

*Copilot: Types differ from interfaces in that they can be used to declare a variable, whereas interfaces are only used to describe the structure of an object.*

## Example Folder structure should look like
```
types
├── fetched-user-course.type.ts
├── button-color.ts
├── user-address.ts
├── geo-coords.ts
├── ...
└── index.ts
```

## Good practices
* Export from index.ts - will help with importing them in other places.

```typescript
// /types/index.ts

export * from './fetched-user-course.type'
export * from './button-color'
export * from './user-address'
export * from './geo-coords'
// other types
```

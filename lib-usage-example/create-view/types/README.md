# Types

This folder contains the example types for the `create-view` library.

> Simiral folder is `interfaces` &rarr; but we don't have any interfaces in this project yet. 

*Copilot: Types differ from interfaces in that they can be used to declare a variable, whereas interfaces are only used to describe the structure of an object.*

## Example Folder structure should look like
```
types
├── fetched-user-course.type.ts
├── button-color.type.ts
├── user-address.type.ts
├── geo-coords.type.ts
├── ...
└── index.ts
```

## Good practices
* Export from index.ts - will help with importing them in other places.

```typescript
// /types/index.ts

export * from './fetched-user-course.type'
export * from './button-color.type'
export * from './user-address.type'
export * from './geo-coords.type'
// other types
```

***

**Next step**
[Wizard steps (components)](https://github.com/Walikuperek/Learn-Facade-Service/tree/master/lib-usage-example/create-view/wizard-steps)

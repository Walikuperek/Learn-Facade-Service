# Enums

Example of enums used in the assignment create view wizard.
***
## Folder structure should look like
```
enums
├── step.enum.ts
├── ...
└── index.ts
```
***
## Good practices
* Each enum should be named in `PascalCase`.

* Each enum should have its own file.

* Each enum key should be named in `UPPER_CASE`.
```typescript
// /enums/step.enum.ts

export enum Step {
    DETAILS,
    RESOURCES,
    ASSIGNEES,
    OPTIONS,
    SUMMARY
}
// ...
```

* Each enum should be exported from `index.ts` &rarr; will help with importing them in other places.
```typescript
// /enums/index.ts

export * from './step.enum';
// ...
```

***

**Next step**
* [Models](https://github.com/Walikuperek/Learn-Facade-Service/tree/master/lib-usage-example/create-view/models)

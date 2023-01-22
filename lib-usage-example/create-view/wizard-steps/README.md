# Wizard steps

Example of structuring components used in the assignment create view wizard.

> Each step shouldn't have any business logic or at least don't too much. Gather business logic in services or view component.
> 
> It should **emit** all events to the parent component and the parent component should handle the logic.
> 
> This way we will clarify the responsibilities of each component and make it easier to test.

***

## Folder structure should look like
```
wizard-steps
├── step-one
│   ├── components
│   │   ├── display-name
│   │   ├── ...
│   │   └── index.ts
│   └── ...
├── step-two
│   ├── components
│   │   ├── ...
│   │   └── index.ts
│   └── ...
├── ...
└── index.ts
```
***
## Good practices
* Each step should have its own folder.

* Each step folder should have its own `components` folder &rarr; hides complexity of the step.

* Use `@Input` and `@Output` decorators to pass data to the component and emit events from the component.

* Use as generic components as possible.
```angular2html
<!--
    Don't pass the whole object to the component,
    instead pass only the properties that are needed.
    You will find it easier to test and maintain.
    And probably you will remove complexity from the component.
    
    Even you will find some generic components that can be reused in other places.
-->

Bad
<lib-step-one-display-html
    [html]="html"
    [course]="course"
></lib-step-one-display-html>

Good
<lib-step-one-display-html
    [html]="html"
    [title]="course.title"
></lib-step-one-display-html>
```

* Export from index.ts &rarr; will help with importing them in other places.
```typescript
// /wizard-steps/index.ts

import {STEP_ONE_COMPONENTS} from './wizard-step-one/components'

export const WIZARD_COMPONENTS = [
    ...STEP_ONE_COMPONENTS,
    // other steps components
]

// and you will probably need to reexport them as well
export * from './wizard-step-one/components'
```

***
**Go back to first page**
[Learn Facade Service](https://github.com/Walikuperek/Learn-Facade-Service)

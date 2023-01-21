# Create view

Example of a create wizard view.
***
## Folder structure should look like
```
create-view
├── dto
├── enums
├── models
├── services
├── ...
├── create-view.component.ts
├── create-view.component.html
├── ...
└── index.ts
```
***
## Good practices
* Fetch data that is needed for the UI in `create-view.component` from `facade`.
```typescript
// /create-view/create-view.component.ts
class CreateViewComponent {
    constructor(private createAssignmentFacade: CreateAssignmentFacade) {
        this.viewModel$ = combineLatest([
            this.createAssignmentFacade.fetchUserCourses(),
            this.createAssignmentFacade.fetchUserGroups(),
            this.createAssignmentFacade.fetchUserResources(),
            this.createAssignmentFacade.fetchUserAssignees(),
        ]).pipe(
            map(([userCourses, userGroups, userResources, userAssignees]) => ({
                userCourses,
                userGroups,
                userResources,
                userAssignees,
            }))
        );
    }
    // ...
}
```
```angular2html
// /create-view/create-view.component.html
<ng-container *ngIf="viewModel$ | async as viewModel">
    <app-step-details [userCourses]="viewModel.userCourses"></app-step-details>
    <app-step-resources [userResources]="viewModel.userResources"></app-step-resources>
    <app-step-assignees [userAssignees]="viewModel.userAssignees"></app-step-assignees>
    <app-step-options></app-step-options>
    <app-step-summary></app-step-summary>
</ng-container>
```

* You can fetch data and split it into responsibilities in `Store services/Facade services` &rarr; it will remove some complexity and can make it easy to fetch only once no matter how many times we visit a component

* Focus on methods starting with `on` &rarr; because they are event handlers, and main component should mostly react to user gestures.
```typescript
// /create-view/create-view.component.ts
class CreateViewComponent {
    onAssignUser(user: User) {}
    onRemoveResouce(resource: Resource) {}
    onStepChange(step: Step) {}
    onStepBack() {}
    onStepForward() {}
    onStepSubmit() {}
    // ...
}
```

* Delegate business logic to services, because mainly it's only data manipulation, it will make it easier to test.
```typescript
// /create-view/create-view.component.ts
class CreateViewComponent {
    onRemoveResouce(resource: Resource) {
        this.createAssignmentFacade.removeResource(resource);
    }
    // ...
}
```

* Export everything from `index.ts` &rarr; will help with easier to read and better split imports.
```typescript
// /create-view/index.ts

export * from './dto';
export * from './enums';
export * from './models';
// ...

// Then simply export everything in public-api.ts
export * from './create-view';
```

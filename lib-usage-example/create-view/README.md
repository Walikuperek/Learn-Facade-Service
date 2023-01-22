# Create view

Example of a create wizard view. This site explains most use-cases for view component.

> Describes **create-assignment.component.ts** and **create-assignment.component.html**, don't forget to checkout the code.

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

* Listen to data from `facade` that is needed in the UI within `create-view.component` (if simple view).
```typescript
// /create-view/create-view.component.ts
class CreateViewComponent {
    constructor(private createAssignmentFacade: CreateAssignmentFacade) {
        this.viewModel$ = combineLatest([
            this.createAssignmentFacade.userCourses$,
            this.createAssignmentFacade.userGroups$,
            this.createAssignmentFacade.userResources$,
            this.createAssignmentFacade.userAssignees$,
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

Then in HTMl
```html
/create-view/create-view.component.html
<ng-container *ngIf="viewModel$ | async as viewModel">
    <lib-step-details [userCourses]="viewModel.userCourses"></app-step-details>
    <lib-step-resources [userResources]="viewModel.userResources"></app-step-resources>
    <lib-step-assignees [userAssignees]="viewModel.userAssignees"></app-step-assignees>
    <lib-step-options></app-step-options>
    <lib-step-summary></app-step-summary>
</ng-container>
```


* Listen to data from `facade` inside `step-one.component` (if main view component will grow too big).
```typescript
// /create-view/wizard-steps/step-one/step-one.component.ts
class StepOneComponent {
    
    @Output() courseSelected = EventEmitter<number>();

    constructor(private createAssignmentFacade: CreateAssignmentFacade) {
        this.viewModel$ = combineLatest([
            this.createAssignmentFacade.userCourses$,
            ...
        ]).pipe(
            map(([userCourses, userGroups, userResources, userAssignees]) => ({
                userCourses,
                ...
            }))
        );
    }
    // ...
}
```

Then in HTMl
```html
// /create-view/wizard-steps/step-one/step-one.component.ts
<ng-container *ngIf="viewModel$ | async as viewModel">
    <lib-step-one-course-select
        [userCourses]="viewModel.userCourses"
        (courseSelected)="courseSelected.emit($event)"
    ></lib-step-one-course-select>
</ng-container>
```

* You can fetch data and split it into responsibilities in `Store services/Facade services` &rarr; it will remove some complexity and can make it easy to fetch only once no matter how many times we visit a component

* Delegate business logic to services, it will make it easier to test and split resposibilities.
```typescript
// /create-view/create-view.component.ts
class CreateViewComponent {
    onRemoveResource(resource: Resource) {
        this.createAssignmentFacade.removeResource(resource); // Remove resource from store
        
        // Maybe some http call is required
        this.createAssignmentFacade.removeResource(resource)
            .subscribe({
                next: (response) => console.log('Removed resource', response.resource.id),
                error: (e) => console.error('HttpError: removeResource', e);
            });
            
       // Or simple http request without facade wrapper
       this.assignmentRepository.removeResource(resource).subscribe(...)
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

***

**Next step**
* [Data Transfer Object](https://github.com/Walikuperek/Learn-Facade-Service/tree/master/lib-usage-example/create-view/dto)

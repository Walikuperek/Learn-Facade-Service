# Services

Example of services used in the assignment create view wizard.
***

## Types of services
* **facade service** - service that is either simple store service or is combined from multiple stores.
* **store service** - services that stores data in memory and provides API to access it.
* **http service/repository/DAO** - services that make http requests to the backend, (Data Access Object).
***

## Folder structure should look like
```
services
├── create-assignment.facade.ts
├── step-assignees.store.ts
├── assignment-repository.service.ts
├── ...
└── index.ts

With tests (preferably with sub-folders):
services
├── create-assignment-facade
│   ├── create-assignment.facade.ts
│   └── create-assignment.facade.spec.ts
├── step-assignees-store
├── assignment-repository
├── ...
└── index.ts
```
***

## Good practices
* Change way of thinking to &rarr; user clicks we push fetched data to the store and then components will render it.

* Repository/DAO services should contain methods that make http requests to the backend.

* Repository/DAO service methods should return `Observable` with mapped response to the appropriate `model`.
```typescript
// /services/assignment-repository.service.ts

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Assignment } from '../models/assignment.model';
import { HttpService } from './http.service';

export class AssignmentRepositoryService {
    constructor(private httpService: HttpService) {}

    public getAssignment(id: number): Observable<Assignment> {
        // Use model or factory to map response to the model
        return this.httpService.get<Assignment>(`/assignments/${id}`).pipe(
            map((assignment: Assignment) => new Assignment(assignment))
        );
    }
}
```

* Facade/store services should focus on storing data that will be needed in the process

> NOTE: Use `BehaviorSubject` to store data and `Observable` to expose it.

```typescript
// /services/create-assignment.facade.ts

export class CreateAssignmentFacade implements StoreAggregate<CreateAssignmentStores> {
    
    assignedClasses$: Observable<AssigneeGroup[]>;
    
    // Or remove this.assignedClasses$ from here and since we use public stepAssigneesStore,
    // We can fetch data in components like: this.createAssignmentFacade.stepAssigneesStore.assignedClasses$

    constructor(
        public assignmentStore: AssignmentStore,
        public stepAssigneesStore: StepAssigneesStore,
        private _repository: AssignmentRepository
    ) {
        this.assignedClasses$ = this.stepAssigneesStore.assignedClasses$;
    }
    
    updateAssignment(assignment: Assignment): void {
        this.assignmentStore.update(assignment);
    }

    // Allow simple API to manage data
    appendAssigneesGroup(group: AssigneeGroup): void {
        this.stepAssigneesStore.appendAssigneesGroup(group);
    }
}
```

* Treat your store services like the places where you need to handle some if/else logic.
```typescript
// /services/step-assignees.store.ts

class YourStore extends StateService<YourStoreState> {
    constructor() {
        super({
            classes: [],
            privateGroups: []
        });
    }

    appendAssigneesGroup(group: AssigneeGroup): void {
        if (group.type === AssigneeGroupType.Class) {
            this.appendClass(group);
        } else {
            this.appendPrivateGroup(group);
        }
    }

    private appendClass(group: AssigneeGroup): void {
        this.setState({
            ...this.state,
            classes: [...this.state.classes, group]
        });
    }

    private appendPrivateGroup(group: AssigneeGroup): void {
        this.setState({
            ...this.state,
            privateGroups: [...this.state.privateGroups, group]
        });
    }
}
```

* If business if/else logic is complex consider using `Politic` classes.
```typescript
// /services/step-assignees.store.ts
import {GroupType} from "./group-type.enum";

class StepAssigneesStore extends StateService<StepAssigneesStoreState> {
    constructor() {
        super({
            classes: [],
            privateGroups: []
        });
    }

    appendAssigneesGroup(group: AssigneeGroup): void {
        const politic = this.getPolitic(group);
        politic.appendAssigneesGroup(group);
    }

    private getPolitic(group: AssigneeGroup): StepAssigneesStorePolitic {
        if (group.type === GroupType.CLASS) {
            return new StoreClassPolitic(this);
        } else {
            return new StorePrivateGroupPolitic(this);
        }
    }
}

class StepAssigneesStorePolitic {
    constructor(protected store: StepAssigneesStore) {}

    appendAssigneesGroup(group: AssigneeGroup): void {
        throw new Error('Not implemented');
    }
}
class StoreClassPolitic extends StepAssigneesStorePolitic {
    appendAssigneesGroup(group: AssigneeGroup): void {
        this.store.setState({classes: [...this.store.state.classes, group]});
    }
}
class StorePrivateGroupPolitic extends StepAssigneesStorePolitic {
    appendAssigneesGroup(group: AssigneeGroup): void {
        this.store.setState({privateGroups: [...this.store.state.privateGroups, group]});
    }
}
```

* Consider usage of `Politic` objects to handle if/else in separate place.
```typescript
// /models/group-assignees.politic.ts

export const GroupAssigneesPolitic = {
    isClass: (group: AssigneeGroup): boolean => group.type === GroupType.CLASS,
    isPrivateGroup: (group: AssigneeGroup): boolean => group.type === GroupType.PRIVATE
};

// /services/step-assignees.store.ts
class StepAssigneesStore {
    appendAssigneesGroup(group: AssigneeGroup): void {
        if (GroupAssigneesPolitic.isClass(group)) {
            this.appendClass(group);
        } else if (GroupAssigneesPolitic.isPrivateGroup(group)) {
            this.appendPrivateGroup(group);
        } else {
            throw new Error('Unknown group type');
        }
    }
}
```

* Use DTOs inside services to transform data to the format that is accepted by the backend.
```typescript
class CreateAssignmentFacade {
    createAssignment(assignment: Assignment): Observable<[boolean, Assignment | null]> {
        // DTO - Data Transfer Object
        const dto = new CreateAssignmentDto(assignment);
        return this._repository.createAssignment(dto);
    }
}
```

* Each model should be exported from `index.ts` &rarr; will help with importing them in other places.
```typescript
// /enums/index.ts

export * from './step.enum';
// ...
```

import {AssigneeGroup, Assignment} from "../models";
import {CreateAssignmentDto, SaveAssignmentDto} from "../dto";
import {AssignmentRepository} from "./assignment-repository.service";
import {AssignmentStore} from "./assignment.store";
import {StepAssigneesStore} from "./step-assignees.store";

type StoreAggregate<T> = T;
type CreateAssignmentStores = {
    assignmentStore: AssignmentStore;
    stepAssigneesStore: StepAssigneesStore;
};

@Injectable({providedIn: 'root'})
export class CreateAssignmentFacade implements StoreAggregate<CreateAssignmentStores> {

    constructor(
        public assignmentStore: AssignmentStore,
        public stepAssigneesStore: StepAssigneesStore,
        private _repository: AssignmentRepository
    ) {}

    updateAssignment(assignment: Assignment): void {
        this.assignmentStore.update(assignment);
    }

    appendAssigneesGroup(group: AssigneeGroup): void {
        this.stepAssigneesStore.appendAssigneesGroup(group);
    }

    removeAssigneesGroup(group: AssigneeGroup): void {
        this.stepAssigneesStore.removeAssigneesGroup(group);
    }

    // ...

    createAssignment(assignment: Assignment): Observable<[boolean, Assignment | null]> {
        // transform to DTO which is accepted by the backend
        const dto = new CreateAssignmentDto(assignment);
        return this._repository.createAssignment(dto);
    }

    saveAssignment(assignment: Assignment): Observable<[boolean, Assignment | null]> {
        const dto = new SaveAssignmentDto(assignment);
        return this._repository.saveAssignment(dto);
    }
}

import { Step } from "./enums";
import {CreateAssignmentFacade} from "./services";
import {AssigneeGroup} from "./models";


@Component(`...some imports of css and html files...`)
export class CreateAssignmentComponent implements OnInit {
    /** For usage in html template like: (ngSwitchCase)="Step.DETAILS" */
    Step = Step;
    currentStep: Step;

    constructor(
        public createAssignmentFacade: CreateAssignmentFacade
    ) {
        this.currentStep = Step.DETAILS;
    }

    ngOnInit(): void {
        // Init data that is needed to create an assignment
        // Init data that is needed to create an assignment from saved assignment
    }

    onAppendAssigneesGroup(group: AssigneeGroup): void {
        this.createAssignmentFacade.appendAssigneesGroup(group);
    }
    onRemoveAssigneesGroup(group: AssigneeGroup): void {
        this.createAssignmentFacade.removeAssigneesGroup(group);
    }

    // ...

    onBack(currentStep: Step): void {
        // ...
    }
    onNext(currentStep: Step): void {
        //...
    }
    onCreateAssignment(): void {
        this.createAssignmentFacade.createAssignment(
            this.createAssignmentFacade.assignmentStore.state.assignment
        ).subscribe({
            next: ([isCreated, createdAssignment]) => console.warn(isCreated, createdAssignment)
        });
    }
    onSaveAssignment(): void {
        this.createAssignmentFacade.saveAssignment(
            this.createAssignmentFacade.assignmentStore.state.assignment
        ).subscribe({
            next: ([isSaved, savedAssignment]) => console.warn(isSaved, savedAssignment)
        });
    }
}

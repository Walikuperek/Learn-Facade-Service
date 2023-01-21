import {StateService} from "../../../facade/code/facade_ts_abstract_model";
import {AssigneeGroup, UserCourse} from "../models";
import {GroupType} from "../enums";
import {AssignmentRepository} from "./assignment-repository.service";

interface StepAssigneesState {
    fetched: {
        // Example of grouped data by use case description,
        // -> then it will be way easier to understand vision of state
        userCourses: UserCourse[]
    };
    view: {
        classGroups: AssigneeGroup[];
        privateGroups: AssigneeGroup[];
    };
    // Examples of use case data groups:
    // selected: {...} -> data that is selected, e.g. selected dropdown option,
    // checked: {...} -> data that is checked, e.g. checkbox,
    // form: {...} -> data that is used in forms
}

@Injectable({providedIn: 'root'})
export class StepAssigneesStore extends StateService<StepAssigneesState> {
    classGroups$ = this.select(state => state.view.classGroups);
    privateGroups$ = this.select(state => state.view.privateGroups);
    userCourses$ = this.select(state => state.fetched.userCourses);

    constructor(private _repository: AssignmentRepository) {
        super(DEFAULT_STEP_ASSIGNEES_STATE());
        // Why fetch here?
        // 1. If you want to remove some basic fetch logic from the view component
        // 2. Maybe you need to fetch data only once
        // -> you can fetch data in the view component, but you will need to fetch it every time you enter it
        const exampleUserId = '1';
        this._repository.getUserCourses(exampleUserId)
            .subscribe((courses: UserCourse[]) => this.updateUserCourses(courses));
    }

    updateUserCourses(userCourses: UserCourse[]): void {
        this.setState({fetched: {userCourses}});
    }

    appendAssigneesGroup(group: AssigneeGroup): void {
        if (group.type === GroupType.CLASS) {
            this.setState({view: {...this.state.view, classGroups: [...this.state.view.classGroups, group]}});
        }
        else if (group.type === GroupType.PRIVATE) {
            this.setState({view: {...this.state.view, privateGroups: [...this.state.view.classGroups, group]}});
        } else {
            throw new Error('Unknown group type');
        }
    }

    removeAssigneesGroup(group: AssigneeGroup): void {
        if (group.type === GroupType.CLASS) {
            const classGroups = this.state.view.classGroups.filter(g => g.id !== group.id);
            this.setState({view: {...this.state.view, classGroups}});
        } else if (group.type === GroupType.PRIVATE) {
            const privateGroups = this.state.view.privateGroups.filter(g => g.id !== group.id);
            this.setState({view: {...this.state.view, privateGroups}});
        } else {
            throw new Error('Unknown group type');
        }
    }

    // ...
}

export function DEFAULT_STEP_ASSIGNEES_STATE(): StepAssigneesState {
    return {
        fetched: {
            userCourses: []
        },
        view: {
            classGroups: [],
            privateGroups: []
        }
    };
}

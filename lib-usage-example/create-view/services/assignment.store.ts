import {StateService} from "../../../facade/code/facade_ts_abstract_model";
import {Assignment} from "../models";

@Injectable({providedIn: 'root'})
export class AssignmentStore extends StateService<{assignment: Assignment}> {
    assignment$ = this.select(state => state.assignment);

    constructor() {
        super({assignment: new Assignment()});
    }

    update(assignment: Partial<Assignment>): void {
        this.setState({assignment: new Assignment({...this.state.assignment, ...assignment})});
    }

    reset(): void {
        this.setState({assignment: new Assignment()});
    }
}

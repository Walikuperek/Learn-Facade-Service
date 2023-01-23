import {Assignee} from "./assignee.model";
import {GroupType} from "../enums";

export class AssigneeGroup {
    id: string = '';
    name: string = '';
    type: GroupType | null = null;
    assignees: Assignee[] = [];

    constructor(initialData: Partial<AssigneeGroup>) {
        Object.assign(this, initialData);
    }
}

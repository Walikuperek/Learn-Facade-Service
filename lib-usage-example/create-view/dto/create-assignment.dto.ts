import {Assignment} from "../models";

export class CreateAssignmentDto {
    title: string;

    d_description: string;
    // Example - Backend uses snake_case to create assignment,
    // but Assignment model uses camelCase

    constructor(assignment: Assignment) {
        this.title = assignment.title;
        this.d_description = assignment.description; // See the comment above
        // DTOs helps to avoid typos in communication with the backend (and between backends is used as well)
    }
}

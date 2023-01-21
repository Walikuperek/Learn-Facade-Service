import {FetchedUserCourse} from "../types/fetched-user-course.type";

export class UserCourse {
    id: number;

    constructor(response: FetchedUserCourse) {
        this.id = response.id;
    }
}

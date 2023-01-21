import {FetchedUserCourse} from "../types";
import {Assignment, UserCourse} from "../models";
import {CreateAssignmentDto, SaveAssignmentDto} from "../dto";

const API = 'https://example-domain.com/api';
const URL = {
    createAssignment: API + '/assignment',
    getUserCourses: (userId) => API + `${API}/user/${userId}/courses`,
}

@Injectable({providedIn: 'root'})
export class AssignmentRepository {

    // Default Angular HttpClient should be wrapped in a service,
    // but for the sake of simplicity, I'll leave it here
    constructor(private _http: HttpClient) {}

    createAssignment(assignment: CreateAssignmentDto): Observable<Assignment> {
        return this._http
            .post<Assignment>(URL.createAssignment, assignment)
            .pipe(map(createdAssignmentResponse =>
                new Assignment(createdAssignmentResponse))); // Remember to map the response to the model
    }

    saveAssignment(assignment: SaveAssignmentDto): Observable<Assignment> {
        return this._http
            .put<Assignment>(URL.createAssignment, assignment)
            .pipe(map(savedAssignmentResponse =>
                new Assignment(savedAssignmentResponse))); // Remember to map the response to the model
    }
    
    getUserCourses(userId: string): Observable<UserCourse[]> {
        return this._http
            .get<FetchedUserCourse[]>(URL.getUserCourses(userId))
            .pipe(map(fetchedUserCourses => fetchedUserCourses.map(userCourseResponse =>
                    new UserCourse(userCourseResponse)))); // Remember to map the response to the model
    }

    // ...
}

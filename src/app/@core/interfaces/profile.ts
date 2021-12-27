import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Observable } from 'rxjs';
import { User } from './user';
export interface Profile {

    idProfile? : number;

    role? : string;

    users? : Array<User>;
}

export abstract class ProfileData {
    abstract get gridDataSource(): DataSource;
    abstract list(pageNumber: number, pageSize: number): Observable<any>;
    abstract getProfiles(): Observable<Profile[]>;

}
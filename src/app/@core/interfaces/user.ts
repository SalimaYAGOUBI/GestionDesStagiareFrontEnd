import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Profile } from './profile';
import { Observable } from 'rxjs';

export interface User {

    idUser? : number;

    nomUser? : string;

    prenomUser? : string;

    emailUser? : string;

    profile ? : Profile;

}

export abstract class UserData {
    abstract get gridDataSource(): DataSource;
    abstract list(pageNumber: number, pageSize: number): Observable<any>;

}

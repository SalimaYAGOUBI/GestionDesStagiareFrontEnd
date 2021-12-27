import { User } from "./user";

export class Profile {
    idProfile : number;

    role : string;

    users : Array<User>;

    constructor(idProfile : number, role : string){
        this.idProfile = idProfile;
        this.role = role;
    }

    
}

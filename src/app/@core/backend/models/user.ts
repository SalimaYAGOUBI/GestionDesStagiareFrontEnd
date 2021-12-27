import { Profile } from "./profile";
export class User {
    
    idUser : number;

    nomUser : string;

    prenomUser : string;

    emailUser : string;

    profile : Profile;

    constructor(nomUser : string, prenomUser : string ,emailUser : string, profile : Profile)
    {
        this.nomUser = nomUser;
        this.prenomUser = prenomUser;
        this.emailUser = emailUser
        this.profile = profile
    }

    setIdUser(iduser : number){
        this.idUser = iduser;
    }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../../../@core/backend/models/user';
import { Profile } from '../../../@core/backend/models/profile';
import {ActivatedRoute, Router} from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserService } from '../../../@core/backend/services/user.service';
import { Observable } from 'rxjs';
import { ProfileService } from '../../../@core/backend/services/profile.service';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  UserForm: FormGroup;
  loadingIndicator: boolean = false;
  profiles: Profile[];
  users: User[];  
  idUser : number;
  user : User;
  profile : Profile;
  public isEdit: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: NbToastrService,
    private userService: UserService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getAllProfiles();
    this.getAllUsers();
    this.initForm();
    //Verifie the edit
    this.activatedRoute.params.subscribe( (params) => {
      this.idUser = params['iduser'];
      if(!!this.idUser){
        this.isEdit = true;
        this.initEditableForm(this.idUser);
      }
    });
  }

  private getAllProfiles(){
     this.profileService.getProfiles().subscribe(data => {
     this.profiles = data;
    });
  }

  private getAllUsers(){
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      });
  }

  private initForm() {
    //init the add form
    this.UserForm = this.fb.group({
      nomUser: [null, Validators.required],
      prenomUser: [null, Validators.required],
      emailUser: [null, Validators.required],
      profileUser: [null, Validators.required]
    });
  }
  
  /**
   *
   * @param id id
   */
  private initEditableForm(id: number){
    //init the edit form
    this.userService.getUserById(id).subscribe( (res) => {
      this.user = res;      
      this.UserForm = this.fb.group({
        nomUser: [res.nomUser],
        prenomUser: [res.prenomUser],
        emailUser: [res.emailUser],
        profileUser: [res.profile.role]
      });
    },
    (err) =>{
      console.error(err);
    },
    ); 
  }

  public onSubmit() {
    
    //test the invalid form
    if (this.UserForm.invalid === true) {
      this.toastr.danger(
        'Vous devez remplir toute les champs pour ajouter un user',
        'Formulaire invalidée',
      );
      this.UserForm.markAllAsTouched();
      return;
    }

    //Get the item
    const dataForm: any = this.UserForm.value;
    
    //Vérifier l'existance de ce compte user (email)
    for (var u of this.users) {
      if( (this.isEdit === false && u.emailUser === dataForm.emailUser) || 
          (this.isEdit === true && u.emailUser === dataForm.emailUser && u.idUser != this.idUser)
        ){
          this.toastr.danger(
            'Cet email est utilisé par un autre compte',
            'Compte déjà existe',
          );
          this.UserForm.markAllAsTouched();
          return;
      }
    }
      //create the user
      this.loadingIndicator = true;

      //get the profile
      for (var p of this.profiles) { if(p.role === dataForm.profileUser){ this.profile = p;} }
    
      //Prepare the user
      const userDtoCreate = new User(dataForm.nomUser,dataForm.prenomUser, dataForm.emailUser, this.profile);
      const userDtoUpdate = new User(dataForm.nomUser,dataForm.prenomUser, dataForm.emailUser, this.profile);
      userDtoUpdate.setIdUser(this.idUser);
      //Call the service
      const addActionService : Observable<User> = this.isEdit === true
      ? this.userService.updateUser(userDtoUpdate)
      : this.userService.createUser(userDtoCreate);
      addActionService.subscribe( (res) => {
        this.loadingIndicator = false;
        this.toastr.success('Ajouter avec succès', 'Success');
        setTimeout(() => {
          this.router.navigateByUrl('pages/users');
        }, 400);
      })
  }


  onCancel() {
    this.loadingIndicator = false;
    this.router.navigateByUrl('pages/users');
  }
}

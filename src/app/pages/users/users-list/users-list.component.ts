import { Component, OnInit } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { UserSettings } from './user.setting';
import { Router, ActivatedRoute } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserData } from '../../../@core/interfaces/user';
import { UserService } from '../../../@core/backend/services/user.service';
import { User } from '../../../@core/backend/models/user';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  settings = UserSettings.settings;

  source: DataSource;

  source2 : LocalDataSource = new LocalDataSource();

  users: User[];
  constructor(
    private router: Router,
    private serviceUser: UserService,
    private toastr: NbToastrService,
    private route: ActivatedRoute
    ) {
           
   }

  ngOnInit(): void {
    /*this.source = this.serviceUser.gridDataSource;
    this.source.refresh();*/
    this.getAllUsers();    
  }

  getAllUsers() {
    this.serviceUser.getUsers().subscribe(data => {
        this.users = data;
        });
} 
  goCreateUser(event) {
    this.router.navigateByUrl('pages/users/add');
    
  }

  goUpdateUser(e) {
    const iduser = e.data.idUser;
    this.router.navigateByUrl('pages/users/edit/'+iduser);
  }

  DeleteUser(event){
    if(confirm("Vous voullez vraiment supprimer ce user")) {
      console.log("user delete= "+event.data.idUser);
      this.serviceUser.deleteUser(event.data.idUser);
      this.toastr.success('Suppression avec succès', 'Success');
      setTimeout(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./'], { relativeTo: this.route });
      }, 900);
      
    }
    
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
const routes: Routes = [
  {path: 'add', component: AddUserComponent },
  {path: 'edit/:iduser', component: AddUserComponent},
  {path: '', component: UsersListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

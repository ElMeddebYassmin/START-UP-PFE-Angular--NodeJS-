import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddprojectComponent } from './addproject/addproject.component';
import { ListeUsersComponent } from './admin/liste-users/liste-users.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { LoginComponent } from './login/login.component';
import { ModifierprofilComponent } from './modifierprofil/modifierprofil.component';
import { RegisterComponent } from './register/register.component';
import { UserprofilComponent } from './userprofil/userprofil.component';




const  routes:Routes=[
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'liste/users',component:ListeUsersComponent},
  {path:'user/interface',component:UserprofilComponent},
  {path:'admin/interface',component:AdminprofileComponent},
  {path:'addproject',component:AddprojectComponent},
  {path:'modifierprofil',component:ModifierprofilComponent},
  // {path:'',component:LoginComponent},


]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

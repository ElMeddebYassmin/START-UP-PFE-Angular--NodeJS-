import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{RouterModule,Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import{ReactiveFormsModule} from '@angular/forms'
import{MaterialModule} from './material/material.module';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { ListeUsersComponent } from './admin/liste-users/liste-users.component';
import { UserprofilComponent } from './userprofil/userprofil.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { ModifierprofilComponent } from './modifierprofil/modifierprofil.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { ProjectComponent } from './project/project.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { HomeComponent } from './home/home.component';
import { DesactivatedUsersListComponent } from './admin/desactivated-users-list/desactivated-users-list.component';
import { DepotComponent } from './depot/depot.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ListeProjetsComponent } from './admin/liste-projets/liste-projets.component';
import { ChatComponent } from './chat/chat.component';
import { VisualiserProfilComponent } from './visualiser-profil/visualiser-profil.component';
import { PasserCommandeComponent } from './passer-commande/passer-commande.component';
import { SupprimerProjetComponent } from './supprimer-projet/supprimer-projet.component';
import { CommandeComponent } from './commande/commande.component';

const  routes:Routes=[
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'user/interface',component:UserprofilComponent,/*canActivate:[AuthGuard]*/},
  {path:'admin/interface',component:AdminprofileComponent, children:[
    {path:'liste/users',component:ListeUsersComponent},
    {path:'liste/desac',component:DesactivatedUsersListComponent},
    {path:'liste/projets',component:ListeProjetsComponent},
   
  ]},
  {path:'addproject',component:AddprojectComponent},
  {path:'modifierprofil',component:ModifierprofilComponent},
  {path:'modifieruser',component:ModifierUserComponent},
  {path:'',component:HomeComponent},
  {path:'depot',component:DepotComponent},
  {path:'chat',component:ChatComponent},
  {path:'profil',component:VisualiserProfilComponent},
  {path:'commande', component:PasserCommandeComponent},
  {path:'deleteP',component:SupprimerProjetComponent},
  {path:'listeCmd', component:CommandeComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListeUsersComponent,
    UserprofilComponent,
    AdminprofileComponent,
    ModifierprofilComponent,
    AddprojectComponent,
    UserprofilComponent,
    ProjectComponent,
    ModifierUserComponent,
    HomeComponent,
    DesactivatedUsersListComponent,
    DepotComponent,
    ListeProjetsComponent,
    ChatComponent,
    VisualiserProfilComponent,
    PasserCommandeComponent,
    SupprimerProjetComponent,
    CommandeComponent
               
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatSliderModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot({ position: ["top", "right"]})
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent],
  entryComponents:[AddprojectComponent]

})
export class AppModule { }

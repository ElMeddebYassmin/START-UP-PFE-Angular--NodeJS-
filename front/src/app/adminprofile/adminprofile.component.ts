import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { ModifierprofilComponent } from '../modifierprofil/modifierprofil.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import{NotificationsService} from 'angular2-notifications';
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  sideBarOpen = true;
  tab = new Array();
  userImage: any;
  Choose_file: any;
  imageUrl:any;
  token = localStorage.getItem('token');
  messages: any;
  constructor(private AuthService : AuthService, private router:Router,private dialog :MatDialog,private service:NotificationsService) { }

  ngOnInit() {

    var avatar=localStorage.getItem('avatar');
    var prenom=localStorage.getItem('prenom')
    var nom=localStorage.getItem('nom')
    var token = localStorage.getItem('token');
    var avatar = localStorage.getItem('avatar');
    var decoded = jwt_decode(token); 
    const mail = decoded['email'];
    console.log(mail)
    console.log(decoded);
    console.log(nom);
    console.log(avatar);
    // var id=decoded['email'];
    // this.tab[1]=id;
    this.tab[2]=nom;
    this.tab[3]=prenom;
    this.tab[4]=avatar;

  }
  onFileSelect(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      this.userImage = file
      this.Choose_file = this.userImage.name
      console.log(this.userImage)
      var reader = new FileReader
      reader.onload = (event: any)=>{
          this.imageUrl = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  onSubmit() {
  
    const fd = new FormData
    fd.append('Image',this.userImage)
    var decoded = jwt_decode(this.token); 
    const mail = decoded['email'];
    console.log(mail)
    fd.append('mail', mail)
    this.AuthService.avatar(fd)
        .subscribe(
          data => {
            localStorage.setItem('avatar',data.avatar)
            console.log('success!!',data)
            this.onSuccess("Votre photo de profil a été mise à jour avec succès !")
          },
          error => {
            console.error('Error !!',error),
            this.onError("Une erreur s'est produite !")
            this.messages = error,
            console.log(this.messages)
          }
        )
  
  }
  onSuccess(message){
    this.service.success('Success', message,{
      timeOut:2000,
      animate:'fade',
      showProgressBar:true,
    })
  }

  onError(message){
    this.service.error('Error', message,{
      timeOut:2000,
      animate:'fade',
      showProgressBar:true,
    })
  }
  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="33%";
    dialogConfig.height="90%"
    this.dialog.open(ModifierprofilComponent,dialogConfig);
  }

}

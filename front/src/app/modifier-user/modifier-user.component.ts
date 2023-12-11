import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import{NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.css']
})
export class ModifierUserComponent implements OnInit {
  id
  editForm: FormGroup;
  messages: string;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  telephoneRegx = /^[0-9]{8,8}$/ ;
  tab = new Array();
   nom =localStorage.getItem('nom');
  constructor(
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private service:NotificationsService

    ) {}



  ngOnInit() {
    var nom =localStorage.getItem('nom');
    var prenom=localStorage.getItem('prenom')
    console.log(nom);
    this.tab[2]=nom;
    this.tab[3]=prenom;
   // localStorage.clear();
        this.editForm = this._formBuilder.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
          dateNaissance: ['', Validators.required],
          telephone : [null, [Validators.required, Validators.pattern(this.telephoneRegx)]],
        });

      }
      

          modifier(){
           const userIdUp = localStorage.getItem('userToUpdate'); 
          console.log(userIdUp)
               this.auth.update(userIdUp,new User({ 
                 nom : this.editForm.get('nom').value,
                 prenom : this.editForm.get('prenom').value,
                 email : this.editForm.get('email').value,
                 dateNaissance : this.editForm.get('dateNaissance').value,
                 telephone : this.editForm.get('telephone').value
               }))
               .subscribe(
                 data => {
                  localStorage.setItem('nom',data.nom)
                  localStorage.setItem('prenom',data.prenom)
                  localStorage.setItem('telephone', data.telephone)
                  localStorage.setItem('avatar',data.avatar)
                  localStorage.setItem('dateNaissance',data.dateNaissance)
                  localStorage.setItem('mail',data.email)
                   console.log('success!!',data)
                  this.onSuccess("Cet utilisateur a été mis à jour avec succès !")
               },
                 error => {console.error('Error !!',error),
                            this.onError("Une erreur s'est produite !")}
               )
              console.log('The user was updated with success !');
             
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

}

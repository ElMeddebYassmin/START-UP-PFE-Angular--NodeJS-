import { User } from './../models/user.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import jwt_decode from "jwt-decode";
import { MustMatch } from '../register/mustMatch';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-modifierprofil',
  templateUrl: './modifierprofil.component.html',
  styleUrls: ['./modifierprofil.component.css']
})
export class ModifierprofilComponent {
  id
  tab = new Array();
  editForm: FormGroup;
  messages: string;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  telephoneRegx = /^[0-9]{8,8}$/;
  constructor(
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private service: NotificationsService

  ) { }
  ngOnInit() {
    var nom = localStorage.getItem('nom');
    var prenom = localStorage.getItem('prenom');
    var telephone = localStorage.getItem('telephone');
    var date = localStorage.getItem('dateNaissance');
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    const mail = decoded['email'];
    this.tab[2] = nom;
    this.tab[3] = prenom;
    this.tab[4] = telephone;
    this.tab[5] = mail;
    this.tab[6] = date;


    this.editForm = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      telephone: [null, [Validators.required, Validators.pattern(this.telephoneRegx)]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    );

  }

  modifier() {

    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    console.log(decoded);

    this.auth.updateUser(decoded['id'], new User({
      nom: this.editForm.get('nom').value,
      prenom: this.editForm.get('prenom').value,
      email: this.editForm.get('email').value,
      password: this.editForm.get('password').value,
      dateNaissance: this.editForm.get('dateNaissance').value,
      telephone: this.editForm.get('telephone').value
    }))
      .subscribe(
        data => {

          //mettre à jour les donées stockés du localStorage
          console.log('success!!', data),
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('mail', data.email)
          localStorage.setItem('isAdmin', data.isAdmin)
          localStorage.setItem('nom', data.nom)
          localStorage.setItem('prenom', data.prenom)
          localStorage.setItem('telephone', data.telephone)
          localStorage.setItem('avatar', data.avatar)
          localStorage.setItem('dateNaissance', data.dateNaissance)
          this.onSuccess("Votre profil a été modifié avec succès !")

        },
        error => this.onError("Une erreur s'est produite !")

      )
    console.log('Cet utilisateur a été mis à jour avec succès !');

  }

  hide = "true";


  onSuccess(message) {
    this.service.success('Success', message, {
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true,
    })
  }

  onError(message) {
    this.service.error('Error', message, {
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true,
    })
  }
}

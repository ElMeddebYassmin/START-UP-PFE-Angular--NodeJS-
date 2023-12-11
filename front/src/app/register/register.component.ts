import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { MustMatch } from '../register/mustMatch';
import{NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
 
  registerForm: FormGroup;
  messages: string;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  telephoneRegx = /^[0-9]{8,8}$/ ;
  constructor(
    private _formBuilder: FormBuilder,
    private auth:AuthService,
    private router : Router,
    private service:NotificationsService) {}
  ngOnInit() {
    localStorage.clear();
        this.registerForm = this._formBuilder.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
          dateNaissance: ['', Validators.required],
          telephone : [null, [Validators.required, Validators.pattern(this.telephoneRegx)]],
        
        },
        {
          validator: MustMatch('password', 'confirmPassword')
      });

      }

      onSubmit(){
        this.auth.registerUser(new User({ 
          nom : this.registerForm.get('nom').value,
          prenom : this.registerForm.get('prenom').value,
          email : this.registerForm.get('email').value,
          password : this.registerForm.get('password').value,
          dateNaissance : this.registerForm.get('dateNaissance').value,
          telephone : this.registerForm.get('telephone').value
        
        }))
        .subscribe(
          data => {
            console.log('success!!',data)
            
            this.router.navigate(['/login'])
            this.onSuccess("Votre compte a été créé avec succès ! Vous pouvez y accéder.")
        },
          error => {console.error('Error !!',error),
                    this.onError("Une erreur s'est produite !")}
        )
        console.log('A new user added to the database');
        
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
  hide="true";

}
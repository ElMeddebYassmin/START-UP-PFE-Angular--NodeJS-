import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User} from './../models/user.model';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import{NotificationsService} from 'angular2-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  constructor(private _formBuilder: FormBuilder, private AuthService: AuthService , private Router: Router,
    private service:NotificationsService) {
 
    
   }

  

  ngOnInit() {
    localStorage.clear();
        this.loginForm = this._formBuilder.group({
          email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
            password: ['', Validators.required]
                  
        });

    
    
      
  }

  
   result=localStorage.getItem('isAdmin');
   token=""
  loginUser(){
    localStorage.clear()
    this.AuthService.loginUser (new User ({
      nom : '',
      prenom : '',
      email : this.loginForm.get('email').value,
      password : this.loginForm.get('password').value,
      dateNaissance : '',
      telephone : ''
      }))
    .subscribe(
      res =>  {
        //console.log(res)
        this.token=res.token
        //console.log(res);

        localStorage.setItem('user',JSON.stringify(res.user))
        localStorage.setItem('mail',res.email)
        localStorage.setItem('token',this.token)
        localStorage.setItem('isAdmin',res.isAdmin)
        localStorage.setItem('nom',res.nom)
        localStorage.setItem('prenom',res.prenom)
        localStorage.setItem('telephone', res.telephone)
        localStorage.setItem('avatar',res.avatar)
        localStorage.setItem('dateNaissance',res.dateNaissance)
        //console.log(this.result)
      
        if (res.isAdmin === true){
          this.Router.navigate(['/admin/interface'])
    
        }
        
        else{
        this.Router.navigate(['/user/interface'])}
      },
      err => {console.log(err) ,
      this.onError("Une erreur s'est produite ! Réessayez encore une fois ")}
    )
  }
onGet(email){
  localStorage.setItem('mail',email);
}
//      var decodedToken = jwtHelper.decodeToken(token);

   
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


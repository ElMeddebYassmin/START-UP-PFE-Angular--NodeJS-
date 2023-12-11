import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Back } from '../models/back.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  static loggedIn() {
    throw new Error('Method not implemented.');
  }

  constructor(private http : HttpClient,private router : Router) { }

registerUser(User){
  return this.http.post<any>(Back.authUrl+'/add', User);
}

loginUser(User){
  return this.http.post<any>(Back.loginUrl+'/login', User);
}

logoutUser(){
  localStorage.removeItem('token')
  localStorage.removeItem('isAdmin')
  localStorage.removeItem('nom')
  localStorage.removeItem('prenom')
  localStorage.removeItem('avatar')
  localStorage.removeItem('dateNaissance')
  this.router.navigate(['/'])}


loggedIn(){
  return !!localStorage.getItem('token');
}

getAllUsers(){
  return this.http.get<any>(Back.authUrl+'/');
}
getAllDesactivatedUsers(){
  return this.http.get<any>(Back.authUrl+'/get');
}

deleteUser(id){
  return this.http.delete<any>(Back.authUrl+'/'+id);
}

updateUser(id,User){
  return this.http.put<any>(Back.authUrl+'/'+id,User)
}
update(id,User){
  return this.http.put<any>(Back.authUrl+'/update/'+id,User)
}
activateUser(id){
  return this.http.put<any>(Back.authUrl+'/activate/'+id,true)
}

desactivateUser(id){
  return this.http.put<any>(Back.authUrl+'/desactivate/'+id,true);
}
// ajout de l'avatar
avatar(fd) {
  return this.http.post<any>(Back.authUrl+'/image',fd);
}

}
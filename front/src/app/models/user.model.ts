export class User{
   nom:string;
   prenom:string; 
   dateNaissance:Date; 
   telephone:string;
   email:string; 
   password:string; 
   isAdmin:Boolean;
   activated:Boolean;
   avatar:string;
   
constructor(data ){
this.nom=data.nom;
this.prenom=data.prenom;
this.dateNaissance=data.dateNaissance;
this.telephone=data.telephone;
this.email=data.email;
this.password=data.password;
this.isAdmin=data.isAdmin;
this.activated=data.activated;
this.avatar=data.avatar;
    }

  

}
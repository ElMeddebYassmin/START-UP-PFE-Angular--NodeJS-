export class Command{
    adresse:string;
    telephone:string;
    userId?:number;
    projetId?:number;
     
  constructor(data ){
  this.adresse=data.adresse;
  this.telephone=data.telephone;
  this.userId=data.userId;
  this.projetId=data.projetId;
 
 
 }
  
    
  
  }
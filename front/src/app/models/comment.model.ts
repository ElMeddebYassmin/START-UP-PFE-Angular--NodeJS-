export class Comment{
   contenu:string;
   userId?:number;
   projetId?:number;
    
 constructor(data ){
 this.contenu=data.contenu;
 this.userId=data.userId;
 this.projetId=data.projetId;


}
 
   
 
 }
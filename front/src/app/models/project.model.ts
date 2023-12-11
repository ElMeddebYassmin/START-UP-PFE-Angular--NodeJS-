import {Comment} from '../models/comment.model'
export class Project{
    nomProjet:string;
    description:string; 
    prix:string;
    image:File;
    userId?:string;
    comments?:Comment[];
    
 constructor(data ){
 this.nomProjet=data.nomProjet;
 this.description=data.description;
 this.prix=data.prix;
 this.image=data.image;
 this.userId=data.userId;
 this.comments=data.comments;
 
     }
 
   
 
 }
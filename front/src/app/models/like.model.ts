export class Like{
    isLike:number;
    userId?:number;
    projetId?:number;
     
  constructor(data ){
  this.isLike=data.isLike;
  this.userId=data.userId;
  this.projetId=data.projetId;
 
 
 }
  
    
  
  }
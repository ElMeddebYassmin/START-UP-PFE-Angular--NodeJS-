import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Back } from '../models/back.model';
import { Command } from '../models/command.model'
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
 
  constructor(private http : HttpClient,private router : Router, private projS:ProjectService) { }


  addCommand(a,t,projetId){
    let command={
      'adresse': a,
      'telephone':t,
      'projetId':projetId,
      'userId':JSON.parse(localStorage.getItem('user')).id
    }
    console.log(command);
    
    this.http.post<any>(Back.commandUrl+'/add',command).subscribe(res=>{
      console.log(res);
      
    })
  }

  getAllUserCommands(){
    const userId = JSON.parse(localStorage.getItem('user')).id; 
    return this.http.get<{cmd:Command[]}>(Back.commandUrl+ `/getAllCommands/${userId}`);}

}
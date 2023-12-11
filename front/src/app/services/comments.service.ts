import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Back } from '../models/back.model';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http : HttpClient,private router : Router, private projS:ProjectService) { }

  addComment(c,projetId){
    let comment={
      'contenu': c,
      'projetId':projetId,
      'userId':JSON.parse(localStorage.getItem('user')).id
    }
    
    this.http.post<any>(Back.commentUrl+'/add',comment).subscribe(res => {
      this.projS.projects = res.pro;

     this.projS.subProject.next({pro:[...this.projS.projects]});
      
    })
  }


}

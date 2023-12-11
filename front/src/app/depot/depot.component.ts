import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { CommentsService } from '../services/comments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { Command } from '../models/command.model';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VisualiserProfilComponent } from '../visualiser-profil/visualiser-profil.component';
import { PasserCommandeComponent } from '../passer-commande/passer-commande.component';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {
  projects: Project[] = [];

  c: Comment
  user:User

  tab = new Array();
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  projectSub: any;
  commentForm: FormGroup;


  constructor(private router: Router, private projectService: ProjectService, private commS: CommentsService,
    private _formBuilder: FormBuilder,private dialog :MatDialog,) {
    this.projectService.getProjects();
    this.projectSub = this.projectService.projectsub().subscribe((res) => {
      this.projects = res.pro;
      console.log(res.pro);

    })


  }

  ngOnInit() {
    var avatar = localStorage.getItem('avatar');
    this.tab[4] = avatar;

    this.commentForm = this._formBuilder.group({
      contenu: ['', Validators.required],
    })
    
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    // this.projects.filter = filterValue;
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
  }

  addCommentaire(projetId) {
    // if(this.commentForm.invalid){
    //   return
    // }

    this.commS.addComment(
    this.commentForm.get('contenu').value, 
    projetId);

    const i = this.projects.findIndex(p => p['id'] === projetId)
    //let c:Comment
    this.c = {
      'userId': JSON.parse(localStorage.getItem('user')).id,
      'projetId': projetId,
      'contenu': this.commentForm.get('contenu').value
    }


    this.projects[i].comments.push(this.c)
    this.commentForm.reset()

  }
  onCreate1(projetId){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="37%";
    dialogConfig.height="75%"
    dialogConfig.data={projetId}
    this.dialog.open(PasserCommandeComponent,dialogConfig);
  }

}

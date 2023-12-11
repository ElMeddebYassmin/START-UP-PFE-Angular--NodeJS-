import { Component, OnInit } from '@angular/core';
import {ProjectService}from './../services/project.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { AddprojectComponent } from '../addproject/addproject.component';
import {MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { SupprimerProjetComponent } from '../supprimer-projet/supprimer-projet.component';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projets : Project[]=[];
  projetsU : Project[]=[];
  private unsubscribeAll: Subject<any>;

  constructor(private projService:ProjectService, private dialog :MatDialog,private router : Router) {
    
    
   }

  ngOnInit() {
 
 
    this.projService.getUserProjects();
    this.projService.projectUsub().subscribe((res) => {
        this.projetsU = res;
    console.log(res);
      

    });


  }

onCreate(){
  const dialogConfig=new MatDialogConfig();
  dialogConfig.disableClose=true;
  dialogConfig.width="31%";
  this.dialog.open(AddprojectComponent,dialogConfig);
}

onCreate1(projetId){
  const dialogConfig=new MatDialogConfig();
  dialogConfig.disableClose=true;
  dialogConfig.width="36%";
  dialogConfig.data={projetId}
  this.dialog.open(SupprimerProjetComponent,dialogConfig);
}
}

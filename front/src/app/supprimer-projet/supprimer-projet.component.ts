import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-supprimer-projet',
  templateUrl: './supprimer-projet.component.html',
  styleUrls: ['./supprimer-projet.component.css']
})
export class SupprimerProjetComponent implements OnInit {

  constructor(   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.data.projetId
  }

  supprimerProjet(){
    this.data.projetId
  }

}

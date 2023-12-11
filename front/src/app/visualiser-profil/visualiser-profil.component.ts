import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-visualiser-profil',
  templateUrl: './visualiser-profil.component.html',
  styleUrls: ['./visualiser-profil.component.css']
})
export class VisualiserProfilComponent implements OnInit {
  tab = new Array();
  constructor() { }

  ngOnInit() {
   var nom=localStorage.getItem('nom');
    var prenom=localStorage.getItem('prenom');
    var telephone=localStorage.getItem('telephone');
    var date=localStorage.getItem('dateNaissance');
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token); 
    const mail = decoded['email'];
    this.tab[2]=nom;
    this.tab[3]=prenom;
    this.tab[4]=telephone;
    this.tab[5]=mail;
    this.tab[6]=date;
  }

}

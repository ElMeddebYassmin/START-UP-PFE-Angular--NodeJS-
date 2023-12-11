import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  tab = new Array();
  constructor() { }

  ngOnInit() {
    var avatar=localStorage.getItem('avatar');
    var prenom=localStorage.getItem('prenom')
    var nom=localStorage.getItem('nom')
    this.tab[2]=nom;
    this.tab[3]=prenom;
    this.tab[4]=avatar;
  }

}

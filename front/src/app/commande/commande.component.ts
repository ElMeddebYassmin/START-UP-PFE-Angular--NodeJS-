import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { CommandService } from '../services/command.service';


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  projects:Project[]=[];
  user:User
  private unsubscribeAll: Subject<any>;

  displayedColumns = ['id','projetId','userId','userName'];
  dataSource: MatTableDataSource<UserCommands>;
  constructor( private router : Router, private commandS:CommandService) { 
    try{
      this.commandS.getAllUserCommands().subscribe((result : any)=>{
        let data : UserCommands[]=[];
        result['cmd'].forEach(element => {
          data.push({
            id : element.id,
            projetId : element.projetId,
            userId : element.userId,
            userName:element.userName
          })
        });
        this.dataSource = new MatTableDataSource(data);
      })

    }catch(err){
      this.router.navigate(['errors/error-500']);
    }
    this.unsubscribeAll = new Subject();
  }
  
  ngOnInit() {
    this.commandS.getAllUserCommands().subscribe(res=>{
      console.log(res);
      
    })
  
    
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this.unsubscribeAll.next();
      this.unsubscribeAll.complete();
  }
  applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); 
      filterValue = filterValue.toLowerCase(); 
      this.dataSource.filter = filterValue;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}


export interface UserCommands {
  id : string ;
  projetId : string;
  userId: string;
  userName:string;
  }
  
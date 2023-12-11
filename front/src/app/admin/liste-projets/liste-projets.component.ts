import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-liste-projets',
  templateUrl: './liste-projets.component.html',
  styleUrls: ['./liste-projets.component.css']
})
export class ListeProjetsComponent implements OnInit {
  
  displayedColumns = ['id','nomProjet', 'description','prix','image','userId'];
  dataSource: MatTableDataSource<projectsTable>;
   
 
  private unsubscribeAll: Subject<any>;
  constructor(private router : Router, private projService:ProjectService) { 
    try{
      this.projService.getAllProjects().subscribe((result : any)=>{
        console.log(result);
        
        let data : projectsTable[]=[];
        result['pro'].forEach(element => {
          data.push({
            id : element.id,
            nomProjet : element.nomProjet,
            description : element.description,
            prix : element.prix,
            image : element.image,
            userId:element.userId
           
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
export interface projectsTable {
  id : string ;
  nomProjet : string;
  description : string,
  prix : string,
  image: File;
  userId : string;
  }
  
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ModifierUserComponent } from 'src/app/modifier-user/modifier-user.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import{NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUsersComponent implements OnInit {

  displayedColumns = ['id'/*,'userName'*/,'nom', 'prenom','dateNaissance','email','telephone','action','action1'];
  dataSource: MatTableDataSource<UsersTable>;
   

  private unsubscribeAll: Subject<any>;

  constructor( private router : Router, private authService: AuthService,
    private dialog :MatDialog,private service:NotificationsService) {
    try{
      this.authService.getAllUsers().subscribe((result : any)=>{
        let data : UsersTable[]=[];
        result.forEach(element => {
          data.push({
            id : element.id,
            nom : element.nom,
            prenom : element.prenom,
            dateNaissance : element.dateNaissance,
            email : element.email,
            telephone : element.telephone
          })
        });
        this.dataSource = new MatTableDataSource(data);
      })
    }catch(err){
      this.router.navigate(['errors/error-500']);
    }
    this.unsubscribeAll = new Subject();
   }


   active=localStorage.getItem('activated');

   onDesactivate(id){
    this.authService.desactivateUser(id)
    .subscribe(
      data => {console.log('success!!',data)
      this.router.navigate(['/admin/interface/liste/desac'])
    },
      error => {console.error('Error !!',error) ,
                this.onError("Une erreur s'est produite !")}
    )
    console.log('Cet utilisateur est désactivé !');
    console.log(this.active);
    
  }
  onSuccess(message){
    this.service.success('Success', message,{
      timeOut:2000,
      animate:'fade',
      showProgressBar:true,
    })
  }

  onError(message){
    this.service.error('Error', message,{
      timeOut:2000,
      animate:'fade',
      showProgressBar:true,
    })
  }
  // onActivate(id){
  //   this.authService.activateUser(id)
  //   .subscribe(
  //     data => {console.log('success!!')
  //   },
  //     error => console.error('Error !!',error) 
  //   )
  //   console.log('Cet utilisateur est activé de nouveau !');
    
  // }

  onEdit(id){
    localStorage.setItem('userToUpdate',id)
    
      const dialogConfig=new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.width="33%";
    dialogConfig.height="90%"
      this.dialog.open(ModifierUserComponent,dialogConfig);
    
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


export interface UsersTable {
  id : string ;
  nom : string;
  prenom : string,
  dateNaissance : string,
  email: string;
  telephone : string;
  }
  
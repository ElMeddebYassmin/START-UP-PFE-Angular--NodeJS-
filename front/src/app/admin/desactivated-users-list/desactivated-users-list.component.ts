import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import{NotificationsService} from 'angular2-notifications';
@Component({
  selector: 'app-desactivated-users-list',
  templateUrl: './desactivated-users-list.component.html',
  styleUrls: ['./desactivated-users-list.component.css']
})
export class DesactivatedUsersListComponent implements OnInit {
  displayedColumns = ['id'/*,'userName'*/,'nom', 'prenom','dateNaissance','email','telephone','action2'];
  dataSource: MatTableDataSource<UsersTable>;
   

  private unsubscribeAll: Subject<any>;

  constructor(private router : Router, private authService: AuthService, private service:NotificationsService) {    try{
    this.authService.getAllDesactivatedUsers().subscribe((result : any)=>{
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
  onActivate(id){
    this.authService.activateUser(id)
    .subscribe(
      data => {console.log('success!!')
      this.router.navigate(['/admin/interface/liste/users'])
      this.onSuccess("Cet utilisateur a été activé avec succès !")
    },
      error => {console.error('Error !!',error) ,
    this.onError("Une erreur s'est produite !")}
      
    )
    console.log('Cet utilisateur est activé de nouveau !');
    
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

  ngOnInit() {
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
  
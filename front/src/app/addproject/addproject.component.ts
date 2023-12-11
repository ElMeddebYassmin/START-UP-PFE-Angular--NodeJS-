import { Component } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { ProjectService } from './../services/project.service';
import{NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent {
 
  projectForm: FormGroup;
  messages: string;
  userImage: any;
  Choose_file: any;
  imageUrl:any;
  image: File;
  constructor(
    private _formBuilder: FormBuilder,
    private auth:ProjectService,
    private router: Router,
    private service:NotificationsService){}
  ngOnInit() {
 
    //localStorage.clear();
        this.projectForm = this._formBuilder.group({
          nomProjet: ['', Validators.required],
          description: ['', Validators.required],
          prix: ['', Validators.required],
          image:['',Validators.required]
        },
      );}


    
  Add(){
   
  this.auth.addProject(
  this.projectForm.get('nomProjet').value,
  this.projectForm.get('description').value,
  this.projectForm.get('prix').value,
  //JSON.parse(localStorage.getItem('user')).id,
  this.userImage)
  
 console.log('A new project added to the database');

  }

  onFileSelect(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      this.userImage = file
      this.Choose_file = this.userImage.name
      //console.log(this.userImage)
      var reader = new FileReader
      reader.onload = (event: any)=>{
          this.imageUrl = event.target.result
      }
      reader.readAsDataURL(file)
    }
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


    } 
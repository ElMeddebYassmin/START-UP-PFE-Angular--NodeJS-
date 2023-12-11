import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { DepotComponent } from '../depot/depot.component';
import { Command } from '../models/command.model';
import { Project } from '../models/project.model';
import { CommandService } from '../services/command.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-passer-commande',
  templateUrl: './passer-commande.component.html',
  styleUrls: ['./passer-commande.component.css']
})
export class PasserCommandeComponent implements OnInit {
  cmd: Command;
  telephoneRegx = /^[0-9]{8,8}$/;
  editForm: FormGroup;
  projects:Project[];
  constructor(private _formBuilder: FormBuilder, private service: NotificationsService,
    private commandService: CommandService, projectS:ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.editForm = this._formBuilder.group({

      adresse: ['', Validators.required],
      telephone: [null, [Validators.required, Validators.pattern(this.telephoneRegx)]],
    }
    );

  console.log(this.data);
  
    
  }

  effectuerCommande() {

    this.commandService.addCommand(
      this.editForm.get('adresse').value,
      this.editForm.get('telephone').value,
    this.data.projetId
    )

  }

  onSuccess(message) {
    this.service.success('Success', message, {
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true,
    })
  }

  onError(message) {
    this.service.error('Error', message, {
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true,
    })
  }

}

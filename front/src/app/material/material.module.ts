import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatSliderModule, 
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSelectModule,
    MatDividerModule,
    MatDatepickerModule,
    MatListModule,
    MatStepperModule,
    MatToolbarModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const MaterialListModule = [
  MatButtonModule,
  MatSliderModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDividerModule,
  MatDialogModule,
  MatChipsModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatMenuModule,
  MatGridListModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  FormsModule,
  MatInputModule,
  MatTabsModule,
  MatSelectModule,
  MatStepperModule,
  MatToolbarModule,
  MatCardModule
  
  

]


@NgModule({
  
  imports: [
    MaterialListModule
  ],
  exports:[
    MaterialListModule
  ]
})
export class MaterialModule { }

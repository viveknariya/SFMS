import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-student-persional',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-student-personal.component.html'
})
export class EditStudentPersonalComponent implements OnInit{
  standards!: string[];
  relation!: string[];
  genders!: string[];

  editStudent:FormGroup;

  constructor(private studentService:StudentService,private router:Router){
    this.editStudent = new FormGroup({
      id: new FormControl(),
      first_name: new FormControl(),
      last_name: new FormControl(),
      gender: new FormControl("male"),
      date_of_birth: new FormControl(),
      standard: new FormControl("play"),
      parents_name: new FormControl(),
      parents_mobile: new FormControl(),
      school_name: new FormControl(),
      date_of_admission: new FormControl(),
      comment: new FormControl(),
    });
  }
  
  ngOnInit(): void {
    this.standards = ["play","jr","sr","10"];
    this.relation = ["mother","father","other"]
    this.genders = ["male","female","other"]
    console.log(this.studentService.student())
    this.editStudent.patchValue(this.studentService.student());
  }

  backToStandard(){
    this.router.navigate(['/student']);
  }

  
}

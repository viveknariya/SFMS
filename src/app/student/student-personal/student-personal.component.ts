import { HttpClient } from '@angular/common/http';
import { Component, effect } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Standard, School, Gender, RecordStudent, StudentService, FieldsStudent } from '../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-personal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './student-personal.component.html',
  styleUrl: './student-personal.component.css'
})
export class StudentPersonalComponent {
  skipOnInit:boolean = false;
  standards!: Standard[];
  schools!: School[];
  genders!: Gender[];
  actionMessage!: string;
  selectedStudent!: FieldsStudent;
  editStudent:FormGroup;

  constructor(private studentService:StudentService,private router:Router,private httpClient:HttpClient){
    this.selectedStudent = this.studentService.selectedStudent();
    if(this.selectedStudent.id == null || this.selectedStudent.id == ""){
      this.skipOnInit = true;
      this.router.navigate(['/student']);
    }

    console.log("EditStudentPersonalComponent C")

    this.editStudent = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      first_name: new FormControl(),
      last_name: new FormControl(),
      gender: new FormControl(this.studentService.genders[0].value),
      date_of_birth: new FormControl(),
      standard: new FormControl(this.studentService.standards[1].value),
      parents_name: new FormControl(),
      parents_mobile: new FormControl(),
      school_name: new FormControl(this.studentService.schools[0].value),
      date_of_admission: new FormControl(),
      comment: new FormControl(),
    });

    effect(() => {})
  }
  
  ngOnInit(): void {
    if(this.skipOnInit){
      return;
    }
    console.log("EditStudentPersonalComponent N")
    console.log(this.studentService.selectedStudent())
    this.editStudent.patchValue(this.studentService.selectedStudent());

    this.standards = this.studentService.standards.slice(1);
    this.schools = this.studentService.schools;
    this.genders = this.studentService.genders;
    this.actionMessage = "";
  }



  editStudentPersonal(){
    const payload = this.createPayload();
    console.log(payload);
    this.httpClient.patch<RecordStudent>(`https://api.airtable.com/v0/${this.studentService.selectedStudent().id}`,{fields:payload}).subscribe({
      next: (data:RecordStudent) => {
        this.editStudent.patchValue(data.fields);
        this.actionMessage = "Saved Successfully"
      },
      error: (error:any) => {
        console.log(error)
      },
      complete: () => {}
    })
  }

  createPayload() {
    const payload: any = {};
    // Iterate through the controls
    Object.keys(this.editStudent.controls).forEach((key) => {
      const control:any = this.editStudent.get(key);
      // Check if the control has a value and it's not null
      if (control.value !== null && control.value !== "" && key !== "id") {
        payload[key] = control.value;
      }
    });
    return payload;
  }

  resetForm(){
    this.editStudent.setValue(this.studentService.selectedStudent());
  }

  popupClose(){
    this.actionMessage = "";
  }
}

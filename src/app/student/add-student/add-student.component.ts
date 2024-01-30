import { Component, OnInit, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gender, RecordStudent, School, Standard, StudentService } from '../student.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AirtableConstant } from '../../airtable.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent implements OnInit {
  standards!: Standard[];
  schools!: School[];
  genders!: Gender[];
  actionMessage!: string;

  addStudent:FormGroup;

  constructor(private studentService:StudentService,private router:Router,private httpClient:HttpClient){
    this.addStudent = new FormGroup({
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
    this.actionMessage = "";
    this.standards = this.studentService.standards.slice(1);
    this.schools = this.studentService.schools;
    this.genders = this.studentService.genders;
  }

  backToStandard(){
    this.router.navigate(['/student']);
  }

  addStudentPersonal(){
    const header = {
      "Authorization": `Bearer ${AirtableConstant.Token}`,
    }
    const payload = this.createPayload();
    console.log("add payload");
    console.log(payload);
    this.httpClient.post<RecordStudent>(`https://api.airtable.com/v0/${AirtableConstant.BaseId_SFMS}/${AirtableConstant.TableId_Student}`,{records:[{fields:payload}]},{headers:header}).subscribe({
      next: (data:RecordStudent) => {
        console.log(data);
        this.addStudent.patchValue(data.fields);
        this.actionMessage = "Added Successfully"
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
    Object.keys(this.addStudent.controls).forEach((key) => {
      const control:any = this.addStudent.get(key);
      // Check if the control has a value and it's not null
      if (control.value !== null && control.value !== "" && key !== "id") {
        payload[key] = control.value;
      }
    });
    return payload;
  }

  resetForm(){
    this.addStudent.setValue({
      id: null,
      first_name: null,
      last_name: null,
      gender: this.studentService.genders[0].value,
      date_of_birth: null,
      standard: this.studentService.standards[1].value,
      parents_name: null,
      parents_mobile: null,
      school_name: this.studentService.schools[0].value,
      date_of_admission: null,
      comment: null,
    })
  }

  popupClose(){
    this.actionMessage = "";
  }
}

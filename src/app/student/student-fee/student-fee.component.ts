import { Component, OnInit } from '@angular/core';
import { RecordFee, RootObjectFee } from '../../fee/fee.service';
import { HttpClient } from '@angular/common/http';
import { RecordStudent, StudentService } from '../student.service';
import { AirtableConstant } from '../../airtable.service';
import { Router } from '@angular/router';
import { StudentFeeService } from './student-fee.service';

@Component({
  selector: 'app-student-fee',
  standalone: true,
  imports: [],
  templateUrl: './student-fee.component.html'
})
export class StudentFeeComponent implements OnInit {

  skipOnInit:boolean = false;
  store:RecordFee[] =[];
  data:RecordFee[] = [];
  selectedStudent!: RecordStudent;

  constructor(private studentFeeService:StudentFeeService,private studentService:StudentService,private router:Router,private httpClient:HttpClient) {
    this.selectedStudent = this.studentService.selectedStudent();
    if(this.selectedStudent.id == null || this.selectedStudent.id == ""){
      this.skipOnInit = true;
      this.router.navigate(['/student']);
    }
  }
  ngOnInit(): void {
    if(this.skipOnInit){
      return;
    }
    this.selectedStudent = this.studentService.selectedStudent();
    const header = {
      "Authorization": `Bearer ${AirtableConstant.Token}`,
    }
    this.httpClient.get<RootObjectFee>(`https://api.airtable.com/v0/${AirtableConstant.BaseId_SFMS}/fee_transection`,{headers:header}).subscribe({
      next: (nxt:RootObjectFee) => {
        this.store = nxt.records;
        
        this.data = this.store.filter((fee:RecordFee) => {
          if(fee.fields.student_id == this.selectedStudent.fields.id){
            return true;
          }
          else{
            return false;
          }
        })
      }
    })
  }

  addStudentFee(){
    this.studentFeeService.selectedStudentFeeAddMode.set(true);
    this.router.navigate(["/student/editStudent/addEditStudentFee"])
  }

  editStudentFee(item:RecordFee){
    this.studentFeeService.selectedStudentFee.set(item);
    this.studentFeeService.selectedStudentFeeAddMode.set(false);
    this.router.navigate(["/student/editStudent/addEditStudentFee"])
  }

  deleteStudentFee(item:RecordFee){

  }
}

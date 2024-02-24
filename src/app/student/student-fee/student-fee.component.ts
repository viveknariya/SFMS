import { Component, OnInit } from '@angular/core';
import { RecordFee, RootObjectFee } from '../../fee/fee.service';
import { HttpClient } from '@angular/common/http';
import { FieldsStudent, RecordStudent, StudentService } from '../student.service';
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
  actionMessage!: string;
  store:RecordFee[] =[];
  data:RecordFee[] = [];
  selectedStudent!: FieldsStudent;

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

    this.httpClient.get<RootObjectFee>(`https://api.airtable.com/v0/fee_transection`).subscribe({
      next: (nxt:RootObjectFee) => {
        this.store = nxt.records;
        
        this.data = this.store.filter((fee:RecordFee) => {
          if(fee.fields.student_id == this.selectedStudent.id){
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
    this.router.navigate(["/student/manage/addEditFee"])
  }

  editStudentFee(item:RecordFee){
    this.studentFeeService.selectedStudentFee.set(item);
    this.studentFeeService.selectedStudentFeeAddMode.set(false);
    this.router.navigate(["/student/manage/addEditFee"])
  }

  deleteStudentFee(item:RecordFee){
    this.httpClient.delete<any>(`https://api.airtable.com/v0/${item.id}`).subscribe({
      next: (data:any) => {
        console.log(data);
        this.actionMessage = "Deleted Successfully"
      },
      error: (error:any) => {
        console.log(error)
      },
      complete: () => {}
    })
  }


}

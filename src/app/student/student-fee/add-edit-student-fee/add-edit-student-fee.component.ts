import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModeOfTransections, StudentFeeService } from '../student-fee.service';
import { Router } from '@angular/router';
import { RecordStudent, StudentService } from '../../student.service';
import { HttpClient } from '@angular/common/http';
import { RecordFee } from '../../../fee/fee.service';

@Component({
  selector: 'app-add-edit-student-fee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-student-fee.component.html',
  styleUrl: './add-edit-student-fee.component.css'
})
export class AddEditStudentFeeComponent {
  isAddMode!: boolean;
  actionMessage!: string;
  addEditFee!: FormGroup;
  modeOfTransections:ModeOfTransections[];
  backToFee(){
    this.router.navigate(['/student/manage/fee'])
  }
  addEditStudentFee(){
    if(this.isAddMode){
      const payload = this.createPayload();
      console.log("add payload");
      console.log(payload);
      this.httpClient.post<RecordFee>(`https://api.airtable.com/v0/transection`,{records:[{fields:payload}]}).subscribe({
        next: (data:RecordFee) => {
          console.log(data);
          this.addEditFee.patchValue(data.fields);
          this.actionMessage = "Added Successfully"
        },
        error: (error:any) => {
          console.log(error)
        },
        complete: () => {}
      })
    }
    else{
      const payload = this.createPayload();
      console.log("edit payload");
      console.log(payload);
      this.httpClient.patch<RecordFee>(`https://api.airtable.com/v0/ableId_Fee_transection}/${this.studentFeeService.selectedStudentFee().id}`,{fields:payload}).subscribe({
        next: (data:RecordFee) => {
          console.log(data);
          this.addEditFee.patchValue(data.fields);
          this.actionMessage = "Edited Successfully"
        },
        error: (error:any) => {
          console.log(error)
        },
        complete: () => {}
      })
    }

  }
  resetForm(){}

  constructor(private studentFeeService:StudentFeeService,private router:Router,private httpClient:HttpClient,private studentService:StudentService){
    this.actionMessage = "";
    this.modeOfTransections = this.studentFeeService.modeOfTransections;
    this.isAddMode = this.studentFeeService.selectedStudentFeeAddMode();
    this.addEditFee = new FormGroup({
      amount: new FormControl(),
      mode_of_transection : new FormControl(this.modeOfTransections[0].value),
      comment:new FormControl(),
      date_of_transection:new FormControl(this.formatDate(new Date)),
    })
    if(!this.isAddMode){
      this.addEditFee.patchValue(this.studentFeeService.selectedStudentFee().fields);
    }
  }

  formatDate(date: Date): string {
    // Format the date to 'YYYY-MM-DD' as required by the input type="date"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  createPayload() {
    const payload: any = {};
    // Iterate through the controls
    Object.keys(this.addEditFee.controls).forEach((key) => {
      const control:any = this.addEditFee.get(key);
      // Check if the control has a value and it's not null
      if (control.value !== null && control.value !== "" && key !== "id") {
        payload[key] = control.value;
      }
    });
    payload["amount"] = +payload["amount"]
    payload["student_id"] = ""+this.studentService.selectedStudent().id;
    return payload;
  }

  popupClose(){
    this.actionMessage = "";
  }
}

import { Component, effect } from '@angular/core';
import { FieldsStudent, RecordStudent, RootObjectStudent, StudentService } from '../student.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AirtableConstant } from '../../airtable.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  store:RecordStudent[] =[];

  data:RecordStudent[] = [];
 
  constructor(private httpClient:HttpClient,private router:Router,private studentService:StudentService){
    effect(() => {
      const val = this.studentService.selectedStandard();
      if(val.id == "all"){
        this.data = this.store;
        return;
      }
      this.data = this.store.filter((student:RecordStudent) => {
        if(student.fields.standard == val.id){
          return true;
        }
        return false;
      })

    })
  }

  ngOnInit(): void {
    const header = {
      "Authorization": `Bearer ${AirtableConstant.Token}`,
    }
    this.httpClient.get<RootObjectStudent>('https://api.airtable.com/v0/appRKS3HtwJJg6jMv/tbleA4PW0oqduyY48',{headers:header}).subscribe({
      next: (data:RootObjectStudent) => {
        this.store = data.records as RecordStudent[];
        this.data = data.records as RecordStudent[];

        const val = this.studentService.selectedStandard();
          if(val.id == "all"){
            this.data = this.store;
            return;
          }
        this.data = this.store.filter((student:RecordStudent) => {
          if(student.fields.standard == val.id){
            return true;
          }
          return false;
        })
      },
      error: (err) => {
      
      }
      ,complete: () => {
        console.log('completed');
      }
    })
  }

  addStudent(){
    this.router.navigate(['/student/addStudent'])
  }

  editStudent(item:FieldsStudent){
    this.studentService.student.set(item);
    this.router.navigate(['/student/editStudent']);
  }

  editStudentFee(item:FieldsStudent){

  }
}

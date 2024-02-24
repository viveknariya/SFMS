import { Component, effect } from '@angular/core';
import { FieldsStudent, RecordStudent, Standard, StudentService } from '../student.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BackendConstant } from '../../backend';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  store:FieldsStudent[] =[];
  data:FieldsStudent[] = [];
  searchStudent:FormControl;
  selectedStudent!: RecordStudent;
  standard:FormControl;

  Standards:Standard[]=[];
  activeStandard!: Standard;
 
  constructor(private httpClient:HttpClient,private router:Router,private studentService:StudentService){
    console.log("student list constructor");
    // effect(() => {
    //   const val = this.studentService.selectedStandard();
    //   if(val.value == "all"){
    //     this.data = this.store;
    //     return;
    //   }
    //   this.data = this.store.filter((student:RecordStudent) => {
    //     if(student.fields.standard == val.value){
    //       return true;
    //     }
    //     return false;
    //   })
    // })

    this.searchStudent = new FormControl();

    

    this.Standards = this.studentService.standards;
    effect(() => {
      this.activeStandard = this.studentService.selectedStandard();
    })

    this.standard = new FormControl(this.Standards[0].value);
  }

  ngOnInit(): void {

    this.searchStudent.valueChanges.subscribe({
      next: (val) => {
        console.log(val);
        this.data = this.store.filter((student:FieldsStudent) => {
          if((student.first_name.toLowerCase().includes(val.toLowerCase()) || student.last_name.toLowerCase().includes(val.toLowerCase())) && (student.standard == this.studentService.selectedStandard().value || this.studentService.selectedStandard().value == "all")){
              return true;
          }
          return false;
        })
      }
    })

    this.standard.valueChanges.subscribe({
      next: (val) => {
        if(val == "all"){
          this.data = this.store;
          return;
        }
        this.data = this.store.filter((student:FieldsStudent) => {
          if(student.standard == val){
            return true;
          }
          return false;
        })
      }
    })

    console.log("student list ngOnInit");
    this.httpClient.get<FieldsStudent[]>(`${BackendConstant.BASE_URL}/api/student`).subscribe({
      next: (data:FieldsStudent[]) => {
        this.store = data as FieldsStudent[];
        this.data = data as FieldsStudent[];

        const val = this.studentService.selectedStandard();
          if(val.value == "all"){
            this.data = this.store;
            return;
          }
        this.data = this.store.filter((student:FieldsStudent) => {
          if(student.standard == val.value){
            return true;
          }
          return false;
        })
      },
      error: (err) => {
      
      }
      ,complete: () => {
      }
    })
  }

  addStudent(){
    this.router.navigate(['/student/addStudent'])
  }

  editStudent(item:FieldsStudent){
    this.studentService.selectedStudent.set(item);
    this.router.navigate(['/student/editStudent/editPersonal']);
  }

  editStudentFee(item:FieldsStudent){
    this.studentService.selectedStudent.set(item);
    this.router.navigate(['/student/editStudent/fee']);
  }

  manageStudent(item:FieldsStudent){
    this.studentService.selectedStudent.set(item);
    this.router.navigate(['/student/manage']);
  }
}

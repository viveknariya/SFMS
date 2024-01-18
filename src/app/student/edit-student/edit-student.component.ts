import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RecordStudent, StudentService } from '../student.service';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterOutlet],
  templateUrl: './edit-student.component.html'
})
export class EditStudentComponent {

  skipOnInit:boolean = false;
  selectedStudent!: RecordStudent;

  constructor(private studentService:StudentService,private ruter:Router){
    this.selectedStudent = this.studentService.selectedStudent();
    if(this.selectedStudent.id == null || this.selectedStudent.id == ""){
      this.skipOnInit = true;
      this.ruter.navigate(['/student']);
    }
  }
}

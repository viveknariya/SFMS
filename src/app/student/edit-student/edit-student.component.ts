import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FieldsStudent, StudentService } from '../student.service';
import { EditStudentPersonalComponent } from './edit-student-personal/edit-student-personal.component';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterOutlet],
  templateUrl: './edit-student.component.html'
})
export class EditStudentComponent {

  selectedStudent!: FieldsStudent;

  constructor(private studentService:StudentService){
    this.selectedStudent = this.studentService.student();
  }
  


}

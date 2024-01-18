import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router:Router,private studentService:StudentService){

  }
  toNavigate(val:string){
    this.router.navigate([val])
    this.studentService.selectedStandard.set(this.studentService.standards[0]);

  }
}

import { AfterViewInit, Component, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';
import { Standard, StudentService } from '../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-menu.component.html',
  styleUrl: './student-menu.component.css'
})
export class StudentMenuComponent {
  Standards:Standard[]=[];
  activeStandard!: Standard;
  constructor(private studentService:StudentService,private router:Router){
    this.Standards = this.studentService.standards;
    effect(() => {
      this.activeStandard = this.studentService.selectedStandard();
    })
  }
  standardFilter(item:Standard){
    this.studentService.selectedStandard.set(item);
    this.router.navigate(['/student']);
  }
}

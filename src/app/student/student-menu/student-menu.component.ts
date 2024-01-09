import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Standard, StudentService } from '../student.service';

@Component({
  selector: 'app-student-menu',
  standalone: true,
  imports: [],
  templateUrl: './student-menu.component.html',
  styleUrl: './student-menu.component.css'
})
export class StudentMenuComponent {
  Standards:Standard[]=[];
  constructor(private studentService:StudentService,private router:Router){
    this.Standards = [
      {name:"# All",id:"all"},
      {name:"# Nursery",id:"nursery"},
      {name:"# Play",id:"play"},
      {name:"# Junior",id:"junior"},
      {name:"# Senior",id:"senior"},
      {name:"# 1",id:"1"},
      {name:"# 2",id:"2"},
      {name:"# 3",id:"3"},
      {name:"# 4",id:"4"},
      {name:"# 5",id:"5"},
      {name:"# 6",id:"6"},
      {name:"# 7",id:"7"},
      {name:"# 8",id:"8"},
      {name:"# 9",id:"9"},
      {name:"# 10",id:"10"},
      {name:"# 11",id:"11"},
      {name:"# 12",id:"12"},
    ]

  }
  standardFilter(item:Standard){
    this.studentService.selectedStandard.set(item);
    this.router.navigate(['/student']);
  }
}

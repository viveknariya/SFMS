import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fee-menu.component.html'
})
export class FeeMenuComponent {
  constructor(private router:Router){

  }
  toNavigate(val:string){
    this.router.navigate([`fee/${val}`])
  
  }
}

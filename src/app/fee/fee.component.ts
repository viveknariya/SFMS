import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeeMenuComponent } from './fee-menu/fee-menu.component';

@Component({
  selector: 'app-fee',
  standalone: true,
  imports: [RouterOutlet,FeeMenuComponent],
  templateUrl: './fee.component.html',
  styleUrl: './fee.component.css'
})
export class FeeComponent {

}

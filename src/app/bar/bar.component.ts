import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-bar',
  imports: [RouterModule],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'] 
})
export class BarComponent { }

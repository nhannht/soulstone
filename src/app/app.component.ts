import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StatListComponent} from "./stat-list/stat-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StatListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'historica-stats';
}

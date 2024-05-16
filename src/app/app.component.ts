import {AfterViewInit, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PluginListComponent} from "./plugin-list/plugin-list.component";
import {NavComponent} from "./nav/nav.component";
import {AppDataService} from "../service/app-data.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PluginListComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  title = 'historica-stats';
  constructor(private appDataService: AppDataService){

  }

  ngAfterViewInit(): void {
    this.appDataService.fetchPluginStatsAndConvertedToStructuredData();
  }
}

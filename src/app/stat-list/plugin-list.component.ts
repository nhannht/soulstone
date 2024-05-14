import {Component, OnInit} from "@angular/core";
import {NgFor, NgIf} from "@angular/common";
import {PluginDetailsComponent} from "../plugin-stats/plugin-details.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppDataService} from "../../service/app-data.service";

// type Plugin = {
//   [key: string]: [value: string]
// }

// type AllPlugin = {
//   [pluginName: string]: Plugin
// }

@Component({
  selector: 'app-stat-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    PluginDetailsComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './plugin-list.component.html',
  styleUrl: './plugin-list.component.css',

})
export class PluginListComponent implements OnInit {
  get appDataService(): AppDataService {
    return this._appDataService;
  }

  get allPlugin(): any {
    return this._allPlugin;
  }

  set allPlugin(value: any) {
    this._allPlugin = value;
  }

  get searchString(): string {
    return this._searchString;
  }

  set searchString(value: string) {
    this._searchString = value;
  }

  get pluginsToDisplay(): any {
    return this._pluginsToDisplay;
  }

  set pluginsToDisplay(value: any) {
    this._pluginsToDisplay = value;
  }


  private _pluginsToDisplay: any = {}

  private _searchString: string = ""

  private _allPlugin: any[] = []



  constructor(private _appDataService: AppDataService
              ) {

  }

  ngOnInit(): void {
    if (sessionStorage.getItem("all-plugin-session-storage") === null) {
      this.appDataService.fetchPluginStatsAndConvertedToStructuredData().subscribe({
        next: data => {

          this.allPlugin = data
          sessionStorage.setItem("all-plugin-session-storage",JSON.stringify(data))

        },
        error: e => console.log(e)
      })
    } else {
      this.allPlugin = JSON.parse( sessionStorage.getItem("all-plugin-session-storage")!)
    }


  }

  onInputKeyUp($event: any) {
    if ($event.target) {
      this.searchString = $event.target.value;

    }

    if (this.searchString.trim() === "") {
      this._pluginsToDisplay = Object.assign({}, this.allPlugin)

    } else {
      const pluginsName = Object.keys(this.allPlugin)
      const pluginsMatch: string[] = []
      pluginsName.forEach(name => {
        // console.log(name)
        if (name.search(this.searchString.toLowerCase()) !== -1) {
          pluginsMatch.push(name)
        }
      })

      pluginsName.forEach(name => {
        if (!pluginsMatch.includes(name)) {
          delete this._pluginsToDisplay[name]
        }
      })
    }


  }

  // For Object.keys() in html template
  protected readonly Object = Object;


}

import {Component, HostListener, OnInit} from "@angular/core";
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
  selector: 'app-plugin-list',
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

  get allPlugin(): any[] {
    return this._allPlugin;
  }

  set allPlugin(value: any[]) {
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


  private _pluginsToDisplay: any[] = [];

  private _searchString: string = ""

  private _allPlugin: any[] = []


  constructor(private _appDataService: AppDataService
  ) {

  }

  @HostListener("window:unload", ['$event'])
  unloadHandler() {
    localStorage.setItem("all-plugin-local-storage", JSON.stringify(this.allPlugin))
  }

  @HostListener("window:reload", ['$event'])
  reloadHandler() {
    localStorage.setItem("all-plugin-local-storage", JSON.stringify(this.allPlugin))
  }


  ngOnInit(): void {

    if (sessionStorage.getItem("all-plugin-session-storage") === null) {
      if (localStorage.getItem("all-plugin-local-storage") !== null) {
        this.allPlugin = JSON.parse(localStorage.getItem("all-plugin-local-storage")!)
      }
      this.appDataService.fetchPluginStatsAndConvertedToStructuredData().subscribe({
        next: data => {

          // @ts-ignore
          this.allPlugin = data
          this.pluginsToDisplay = data
          sessionStorage.setItem("all-plugin-session-storage", JSON.stringify(data))


        },
        error: e => console.log(e)
      })
    } else {
      this.allPlugin = JSON.parse(sessionStorage.getItem("all-plugin-session-storage")!)
      this.pluginsToDisplay = structuredClone(this.allPlugin)
    }

  }

  onInputKeyUp($event: any) {
    if ($event.target) {
      this.searchString = $event.target.value;

    }

    if (this.searchString.trim() === "") {
      this._pluginsToDisplay = Object.assign({}, this.allPlugin)

    } else {
      const pluginsName = this.allPlugin.map(p => p["name"])
      // console.log(pluginsName)
      const pluginsMatch: string[] = []
      pluginsName.forEach(name => {
        // console.log(name)
        if (name.search(this.searchString.toLowerCase()) !== -1) {
          pluginsMatch.push(name)
        }
      })
      // console.log(pluginsMatch)
      this.pluginsToDisplay = [];
      this.allPlugin.forEach(plugin => {
        if (pluginsMatch.includes(plugin["name"])) {
          this.pluginsToDisplay.push(plugin)
        }
      })

    }


  }

  // For Object.keys() in html template
  protected readonly Object = Object;


}

import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {NgFor, NgIf} from "@angular/common";
import {PluginDetailsComponent} from "./plugin-stats/plugin-details.component";
import {RouterLink, RouterOutlet} from "@angular/router";

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
  templateUrl: './stat-list.component.html',
  styleUrl: './stat-list.component.css',

})
export class StatListComponent implements OnInit {
  public allPluginStats = {};
  public structuredPluginsStats: any = {};
  public currentPlugin: any;
  public currentSearchString: string = "";
  public pluginsToDisplay: any = {}

  constructor(public httpClient: HttpClient) {

  }


  getPluginStats(pluginName: string) {
    //@ts-ignore
    let pluginStats = this.allPluginStats[pluginName];
    const {"downloads": downloads, "updated": updated, ...versions} = pluginStats
    const versionNameListSorted = this.sortVersion(Object.keys(versions))
    let versionsSorted: any = {}
    versionNameListSorted.forEach(ver => versionsSorted[ver] = versions[ver])
    return {
      downloads,
      updated,
      versionsSorted
    }

  }

  onClick(pluginName: string) {
    this.currentPlugin = this.structuredPluginsStats[pluginName]


  }

  protected readonly Object = Object;

  sortVersion(versionsNameList: string[]) {
    return versionsNameList.map(a => a.split('.').map(n => +n + 100000).join('.')).sort()
      .map(a => a.split('.').map(n => +n - 100000).join('.'));
  }

  ngOnInit(): void {
    this.httpClient.get("https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json")
      .subscribe({
        next: data => {
          this.allPluginStats = data
          const pluginsNameList = Object.keys(this.allPluginStats)
          pluginsNameList.forEach(plugin => {
            this.structuredPluginsStats[plugin] = this.getPluginStats(plugin)

          })
          this.pluginsToDisplay = Object.assign({}, this.structuredPluginsStats)
        },
        error: e => console.log(e),
      })


  }

  onInputKeyUp($event: any) {
    if ($event.target) {
      this.currentSearchString = $event.target.value;

    }

    if (this.currentSearchString.trim() === "") {
      this.pluginsToDisplay = Object.assign({}, this.structuredPluginsStats)

    } else {
      const pluginsName = Object.keys(this.structuredPluginsStats)
      const pluginsMatch: string[] = []
      pluginsName.forEach(name => {
        // console.log(name)
        if (name.search(this.currentSearchString.toLowerCase()) !== -1) {
          pluginsMatch.push(name)
        }
      })

      pluginsName.forEach(name => {
        if (!pluginsMatch.includes(name)) {
          delete this.pluginsToDisplay[name]
        }
      })
    }


  }

}

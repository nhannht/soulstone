import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {



  constructor(private _httpClient: HttpClient) {
  }

  public fetchPluginStatsAndConvertedToStructuredData() {
    // return this.httpClient.get("https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json")
    return this._httpClient.get(environment.backendHost + "/api/plugin/all")

  }


  // sortVersion(versionsNameList: string[]) {
  //   return versionsNameList.map(a => a.split('.').map(n => +n + 100000).join('.')).sort()
  //     .map(a => a.split('.').map(n => +n - 100000).join('.'));
  // }

  // public getPluginStats(pluginName: string) {
  //   //@ts-ignore
  //   let pluginStats = this._rawPluginStats[pluginName];
  //   const {"downloads": downloads, "updated": updated, ...versions} = pluginStats
  //   const versionNameListSorted = this.sortVersion(Object.keys(versions))
  //   let versionsSorted: any = {}
  //   versionNameListSorted.forEach(ver => versionsSorted[ver] = versions[ver])
  //   return {
  //     downloads,
  //     updated,
  //     versionsSorted
  //   }
  //
  // }

  public getTopicsDataFromBackEnd() {
    return this._httpClient.get(environment.backendHost + "/api/topic/getall")


  }

  public getTopicWithName(name: string) {
    return this._httpClient.get(environment.backendHost + "/topic/" + name)
  }

  public getPluginWithId(id:string){
    return this._httpClient.get(environment.backendHost + "/plugin/" + id)
  }

}

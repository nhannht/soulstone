import {Component, OnInit} from '@angular/core';
import {AppDataService} from "../../service/app-data.service";
import {DatePipe, formatDate, NgForOf} from "@angular/common";

@Component({
  selector: 'app-recent-updated-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './recent-updated-list.component.html',
  styleUrl: './recent-updated-list.component.css'
})
export class RecentUpdatedListComponent implements OnInit {
  get last30day(): any[] {
    return this._last30day;
  }

  set last30day(value: any[]) {
    this._last30day = value;
  }

  get allPlugin(): any[] {
    return this._allPlugin;
  }

  set allPlugin(value: any[]) {
    this._allPlugin = value;
  }

  private _allPlugin: any[] = [];

  private _last30day: any[] = [];

  constructor(private appDataService: AppDataService) {

  }

  ngOnInit(): void {
    if (sessionStorage.getItem("all-plugin-session-storage") === null) {
      this.appDataService.fetchPluginStatsAndConvertedToStructuredData().subscribe(
        {
          next: data => {
            this.allPlugin = data as any[];
            sessionStorage.setItem("all-plugin-session-storage", JSON.stringify(data))
            this.getPluginsUpdatedInLast30Days();

          },
          error: e => console.log(e)
        }
      )
    } else {
      this.allPlugin = JSON.parse(sessionStorage.getItem("all-plugin-session-storage")!)
      this.getPluginsUpdatedInLast30Days();
    }
  }

  public getPluginsUpdatedInLast30Days() {
    const now = (new Date()).getTime();
    const last30DaysPoint = now - (30 * 24 * 3600 * 1000);
    this.allPlugin.forEach(plugin => {
      // console.log(plugin["statsDetails"]["updated"] / 1000)
      if (plugin["statsDetails"]["updated"] >= last30DaysPoint) {
        // console.log(plugin)
        const clonePlugin = structuredClone(plugin)
        this.last30day.push(clonePlugin);
      }
    })
    // @ts-ignore
    this.last30day.sort((a: Object, b: Object) => {
      // @ts-ignore
      return a["statsDetails"]["updated"] - b["statsDetails"]["updated"]
    })

  }


  protected readonly Date = Date;
  protected readonly formatDate = formatDate;
}

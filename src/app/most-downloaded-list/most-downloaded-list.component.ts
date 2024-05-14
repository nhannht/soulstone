import {Component, OnInit} from '@angular/core';
import {AppDataService} from "../../service/app-data.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-most-downloaded-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './most-downloaded-list.component.html',
  styleUrl: './most-downloaded-list.component.css'
})
export class MostDownloadedListComponent implements OnInit {
  get top50(): any[] {
    return this._top50;
  }

  set top50(value: any[]) {
    this._top50 = value;
  }
  get allPlugins(): any[] {
    return this._allPlugins;
  }

  set allPlugins(value: any[]) {
    this._allPlugins = value;
  }

  private _allPlugins: any[] = [];
  private _top50:any[] = [];

  constructor(private appDataService: AppDataService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("all-plugin-session-storage") === null ){
      this.appDataService.fetchPluginStatsAndConvertedToStructuredData().subscribe(
        {
          next: data => {
            this.allPlugins = data as any[];
            sessionStorage.setItem("all-plugin-session-storage",JSON.stringify(data))
            this.updateTop50()

          },
          error: e => console.log(e)
        }
      )
    } else {
      this.allPlugins = JSON.parse(sessionStorage.getItem("all-plugin-session-storage")!)
      this.updateTop50()
    }
  }

  public updateTop50(){
    const temp = structuredClone(this.allPlugins)
    temp.sort((a,b)=>{
      return a["statsDetails"]["downloads"] - b["statsDetails"]["downloads"];
    })
    this.top50 = temp.slice(0,50)

  }

}

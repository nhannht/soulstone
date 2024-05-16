import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Params} from "@angular/router";
import {AppDataService} from "../../service/app-data.service";
import {Plugin} from "../../types";

@Component({
  selector: 'app-plugin-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    UpperCasePipe
  ],
  templateUrl: './plugin-details.component.html',
  styleUrl: './plugin-details.component.css'
})
export class PluginDetailsComponent implements OnInit {
  get plugin(): Plugin | null {
    return this._plugin;
  }

  set plugin(value: Plugin) {
    this._plugin = value;
  }

  get pluginId(): string {
    return this._pluginId;
  }

  set pluginId(value: string) {
    this._pluginId = value;
  }

  private _pluginId: string = ""
  private _plugin: Plugin | null = null;


  ngOnInit(): void {
    this.route.params.subscribe(
      (p: Params) => {
        this.pluginId = p["pluginId"]
        this.appDataService.getPluginDetailFromBackEnd(this.pluginId).subscribe(
          {
            next: value => {
              this.plugin = value as Plugin
              this.plugin.pluginVersionList.sort((a: any, b: any) => {
                const aVersion: string = a["versionName"]
                const bVersion: string = b["versionName"]
                // @ts-ignore
                return aVersion.replace(/\d+/g, n => +n + 100000)
                  // @ts-ignore
                  .localeCompare(bVersion.replace(/\d+/g, n => +n + 100000))
              })
            },
            error: err => console.log(err),
          }
        )

      }
    )


  }

  constructor(private route: ActivatedRoute,
              private appDataService: AppDataService) {
  }


  protected readonly Object = Object;
}

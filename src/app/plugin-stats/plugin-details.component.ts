import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-plugin-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './plugin-details.component.html',
  styleUrl: './plugin-details.component.css'
})
export class PluginDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe(
      (p:Params) => {
        this.pluginStat2 = p["plugin-name"]
      }
    )


  }

  constructor(private route: ActivatedRoute) {
  }

  @Input() pluginStats: any = ""

  pluginStat2: any = ""

  protected readonly Object = Object;
}

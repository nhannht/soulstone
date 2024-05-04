import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

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
export class PluginDetailsComponent {
  @Input() pluginStats:any = ""

  protected readonly Object = Object;
}

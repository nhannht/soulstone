import { Routes } from '@angular/router';
import {PluginDetailsComponent} from "./stat-list/plugin-stats/plugin-details.component";

export const routes: Routes = [
  {path: 'plugin-details/:plugin-name',component:PluginDetailsComponent}

];

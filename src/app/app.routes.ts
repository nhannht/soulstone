import {Routes} from '@angular/router';
import {PluginDetailsComponent} from "./plugin-stats/plugin-details.component";
import {StatListComponent} from "./stat-list/stat-list.component";

export const routes: Routes = [
  {path:'',
  redirectTo:'plugin-stats-list',
  pathMatch:'full'},
  {path: 'plugin-details/:plugin-name', component: PluginDetailsComponent},
  {path:'plugin-stats-list',component:StatListComponent}

];

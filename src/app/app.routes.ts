import {Routes} from '@angular/router';
import {PluginDetailsComponent} from "./plugin-stats/plugin-details.component";
import {StatListComponent} from "./stat-list/stat-list.component";
import {RecentUpdatedListComponent} from "./recent-updated-list/recent-updated-list.component";
import {MostDownloadedListComponent} from "./most-downloaded-list/most-downloaded-list.component";

export const routes: Routes = [
  {path:'',
  redirectTo:'plugin-stats-list',
  pathMatch:'full'},
  {path: 'plugin-details/:plugin-name', component: PluginDetailsComponent},
  {path:'plugin-stats-list',component:StatListComponent},
  {path:'recent-updated',component:RecentUpdatedListComponent},
  {path:'most-downloads', component: MostDownloadedListComponent}

];

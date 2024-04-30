import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {CropsManagementComponent} from "./crops/pages/crops-management/crops-management.component";
import {CropsHistoryComponent} from "./crops/pages/crops-history/crops-history.component";
import {CropInformationComponent} from "./crops/pages/crops-information/crops-information.component";
import {CropsStatisticsComponent} from "./crops/pages/crops-statistics/crops-statistics.component";
import {ForumManagementComponent} from "./forum/pages/forum-management/forum-management.component";

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'mycrops', component: CropsManagementComponent},
    {path:'history', component: CropsHistoryComponent},
    {path:'info', component: CropInformationComponent},
    {path:'statistics', component: CropsStatisticsComponent},
    {path:'forum',component:ForumManagementComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {SowingsManagementComponent} from "./crops/pages/sowings-management/sowings-management.component";
import {CropsHistoryComponent} from "./crops/pages/crops-history/crops-history.component";
import {SowingInformationComponent} from "./crops/pages/sowings-information/sowings-information.component";
import {CropsStatisticsComponent} from "./crops/pages/crops-statistics/crops-statistics.component";
import {ForumManagementComponent} from "./forum/pages/forum-management/forum-management.component";
import {LoginAndSignupManagementComponent} from "./users/pages/login-and-signup-management/login-and-signup-management.component";
import {SubscriptionsComponent} from "./users/components/subscriptions/subscriptions.component";

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'mycrops', component: SowingsManagementComponent},
    {path:'history', component: CropsHistoryComponent},
    {path: 'info/:id', component: SowingInformationComponent },
    {path:'statistics', component: CropsStatisticsComponent},
    {path:'forum',component:ForumManagementComponent},
    {path:'signup',component:LoginAndSignupManagementComponent},
    {path:'subscriptions',component:SubscriptionsComponent},
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

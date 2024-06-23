import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {SowingsManagementComponent} from "./crops/pages/sowings-management/sowings-management.component";
import {CropsHistoryComponent} from "./crops/pages/crops-history/crops-history.component";
import {SowingInformationComponent} from "./crops/pages/sowings-information/sowings-information.component";
import {CropsStatisticsComponent} from "./crops/pages/crops-statistics/crops-statistics.component";
import {ForumManagementComponent} from "./forum/pages/forum-management/forum-management.component";
import {SubscriptionsComponent} from "./users/components/subscriptions/subscriptions.component";
import {ProfileEditComponent} from "./users/pages/profile-edit/profile-edit.component";
import {authenticationGuard} from "./iam/services/authentication.guard";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";

export const routes: Routes = [
    {path:'home', component: HomeComponent , canActivate: [authenticationGuard]},
    {path:'mycrops', component: SowingsManagementComponent, canActivate: [authenticationGuard]},
    {path:'history', component: CropsHistoryComponent, canActivate: [authenticationGuard]},
    {path: 'info/:id', component: SowingInformationComponent},
    {path:'statistics', component: CropsStatisticsComponent, canActivate: [authenticationGuard]},
    {path:'forum',component:ForumManagementComponent, canActivate: [authenticationGuard]},
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent},
    {path:'subscriptions',component:SubscriptionsComponent},
    {path:'profile',component:ProfileEditComponent , canActivate: [authenticationGuard]},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

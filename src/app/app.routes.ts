import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {MycropsComponent} from "./public/pages/mycrops/mycrops.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'mycrops', component: MycropsComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { LoginManagementComponent} from "./person/pages/login-management/login-management.component";
import { SignupManagementComponent} from "./person/pages/signup-management/signup-management.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'person/logins', component: LoginManagementComponent },
  { path: 'person/signups', component: SignupManagementComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

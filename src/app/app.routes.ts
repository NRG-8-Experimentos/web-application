import { Routes } from '@angular/router';
import {LogInComponent} from './iam/pages/log-in.component/log-in.component';
import {SignUpComponent} from './iam/pages/sign-up.component/sign-up.component';
import {MainMemberComponent} from './shared/pages/main-member.component/main-member.component';
import {MainLeaderComponent} from './shared/pages/main-leader.component/main-leader.component';
import {MainComponent} from './public/pages/main/main.component';
import {authGuard} from './iam/services/auth-guard';

export const routes: Routes = [
  {path: '', component: MainComponent, canActivate:[authGuard]},
  { path: 'sign-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'members/main', component: MainMemberComponent},
  { path: 'leaders/main', component: MainLeaderComponent},
  { path: '**', redirectTo: '' }
];

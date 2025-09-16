import { Routes } from '@angular/router';
import {LogInComponent} from './iam/pages/log-in.component/log-in.component';
import {SignUpComponent} from './iam/pages/sign-up.component/sign-up.component';

export const routes: Routes = [
  {path: '', component: LogInComponent},
  {path: 'log-in', component: LogInComponent},
  {path: '**', redirectTo: ''},
  {path: 'sign-up', component: SignUpComponent}
];

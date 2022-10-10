import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import {AssistantComponent} from "./assistant/assistant.component";
import {DoctorComponent} from "./doctor/doctor.component";
import {UserAssistantListComponent} from "./user/user-assistant-list/user-assistant-list.component";
import {UserHistoryComponent} from "./user/user-history/user-history.component";
import {UserAccountComponent} from "./user/user-account/user-account.component";
import {UserVisitComponent} from "./user/user-visit/user-visit.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'assistant', component: AssistantComponent, canActivate:[AuthGuard], data:{roles:['ASSISTANT']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'assistant-list', component: UserAssistantListComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-history', component: UserHistoryComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-account', component: UserAccountComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-visit', component: UserVisitComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'doctor', component: DoctorComponent ,  canActivate:[AuthGuard], data:{roles:['DOCTOR']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

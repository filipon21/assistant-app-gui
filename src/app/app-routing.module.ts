import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import {UserAssistantListComponent} from "./user/user-assistant-list/user-assistant-list.component";
import {UserHistoryComponent} from "./user/user-history/user-history.component";
import {UserAccountComponent} from "./user/user-account/user-account.component";
import {UserVisitComponent} from "./user/user-visit/user-visit.component";
import {RegisterComponent} from "./register/register.component";
import {UserVisitActionComponent} from "./user/user-visit/user-visit-action/user-visit-action.component";
import {UserHistoryDetailsComponent} from "./user/user-history/user-history-details/user-history-details.component";
import {WorkerComponent} from "./worker/worker.component";
import {WorkerVisitDetailsComponent} from "./worker/worker-visit-details/worker-visit-details.component";
import {WorkerVisitAppointmentComponent} from "./worker/worker-visit-appointment/worker-visit-appointment.component";
import {UserUpcomingComponent} from "./user/user-upcoming/user-upcoming.component";
import {WorkerVisitCancelComponent} from "./worker/worker-visit-cancel/worker-visit-cancel.component";
import {WorkerDrugsComponent} from "./worker/worker-drugs/worker-drugs.component";
import {WorkerHistoryComponent} from "./worker/worker-history/worker-history.component";
import {
  WorkerVisitUserDetailsComponent
} from "./worker/worker-visit-details/worker-visit-user-details/worker-visit-user-details.component";
import {WorkerAddVisitComponent} from "./worker/worker-add-visit/worker-add-visit.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'worker', component: WorkerComponent, canActivate:[AuthGuard], data:{roles:['ASSISTANT', 'DOCTOR']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'assistant-list', component: UserAssistantListComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-history', component: UserHistoryComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-upcoming', component: UserUpcomingComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-account', component: UserAccountComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-visit', component: UserVisitComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-current-visit', component: UserVisitActionComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'user-history-details', component: UserHistoryDetailsComponent ,  canActivate:[AuthGuard],
    data:{roles:['USER']} },
  { path: 'worker-visit-details', component: WorkerVisitDetailsComponent ,  canActivate:[AuthGuard],
    data:{roles:['ASSISTANT', 'DOCTOR']} },
  { path: 'worker-history-details', component: WorkerVisitUserDetailsComponent ,  canActivate:[AuthGuard],
    data:{roles:['ASSISTANT', 'DOCTOR']} },
  { path: 'worker-visit-appointment', component: WorkerVisitAppointmentComponent ,  canActivate:[AuthGuard],
    data:{roles:['ASSISTANT', 'DOCTOR']} },
  { path: 'worker-drugs', component: WorkerDrugsComponent ,  canActivate:[AuthGuard],
    data:{roles:['ASSISTANT', 'DOCTOR']} },
  { path: 'worker-history', component: WorkerHistoryComponent ,  canActivate:[AuthGuard],
    data:{roles:['ASSISTANT', 'DOCTOR']} },
  { path: 'worker-visit-cancel', component: WorkerVisitCancelComponent ,  canActivate:[AuthGuard],
    data:{roles:['ASSISTANT', 'DOCTOR']} },
  { path: 'worker-add-visit', component: WorkerAddVisitComponent ,  canActivate:[AuthGuard],
    data:{roles:['DOCTOR', 'ASSISTANT']} },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

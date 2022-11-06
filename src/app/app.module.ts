import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AuthGuard} from './_auth/auth.guard';
import {AuthInterceptor} from './_auth/auth.interceptor';
import {UserApiService} from './_services/user-api.service';
import {PaginatorComponent} from './shared/paginator/paginator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UserAssistantListComponent} from './user/user-assistant-list/user-assistant-list.component';
import {UserHistoryComponent} from './user/user-history/user-history.component';
import {UserAccountComponent} from './user/user-account/user-account.component';
import {UserVisitComponent} from './user/user-visit/user-visit.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {UserVisitActionComponent} from './user/user-visit/user-visit-action/user-visit-action.component';
import {RegisterComponent} from './register/register.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {DatePipe} from "@angular/common";
import { UserHistoryDetailsComponent } from './user/user-history/user-history-details/user-history-details.component';
import { StatusPipe } from './pipes/status.pipe';
import { TypePipe } from './pipes/type.pipe';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { WorkerSpecializationPipe } from './pipes/worker-specialization.pipe';
import { DateTransformPipe } from './pipes/date-transform.pipe';
import { WorkerComponent } from './worker/worker.component';
import { HistoryTableComponent } from './common/history-table/history-table.component';
import { UpcomingTableComponent } from './common/upcoming-table/upcoming-table.component';
import { WorkerVisitDetailsComponent } from './worker/worker-visit-details/worker-visit-details.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { VisitPrescriptionUploadComponent } from './worker/worker-visit-details/visit-prescription-upload/visit-prescription-upload.component';
import { WorkerVisitRefferalComponent } from './worker/worker-visit-details/worker-visit-refferal/worker-visit-refferal.component';
import { WorkerVisitExemptionComponent } from './worker/worker-visit-details/worker-visit-exemption/worker-visit-exemption.component';
import { WorkerVisitUserDetailsComponent } from './worker/worker-visit-details/worker-visit-user-details/worker-visit-user-details.component';
import { WorkerVisitAppointmentComponent } from './worker/worker-visit-appointment/worker-visit-appointment.component';
import { WorkerUserDetailsComponent } from './worker/worker-user-details/worker-user-details.component';
import { WorkerVisitAppointmentUserTableComponent } from './worker/worker-visit-appointment/worker-visit-appointment-user-table/worker-visit-appointment-user-table.component';
import { UserUpcomingComponent } from './user/user-upcoming/user-upcoming.component';
import { WorkerVisitAppointmentDialogComponent } from './worker/worker-visit-appointment/worker-visit-appointment-dialog/worker-visit-appointment-dialog.component';
import { FreeTableComponent } from './common/free-table/free-table.component';
import { WorkerVisitCancelComponent } from './worker/worker-visit-cancel/worker-visit-cancel.component';
import { FreeTableDialogComponent } from './common/free-table/free-table-dialog/free-table-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { UpcomingTableDialogComponent } from './common/upcoming-table/upcoming-table-dialog/upcoming-table-dialog.component';
import { WorkerDrugsComponent } from './worker/worker-drugs/worker-drugs.component';
import { WorkerHistoryComponent } from './worker/worker-history/worker-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    PaginatorComponent,
    UserAssistantListComponent,
    UserHistoryComponent,
    UserAccountComponent,
    UserVisitComponent,
    UserVisitActionComponent,
    RegisterComponent,
    UserHistoryDetailsComponent,
    StatusPipe,
    TypePipe,
    WorkerSpecializationPipe,
    DateTransformPipe,
    WorkerComponent,
    HistoryTableComponent,
    UpcomingTableComponent,
    WorkerVisitDetailsComponent,
    VisitPrescriptionUploadComponent,
    WorkerVisitRefferalComponent,
    WorkerVisitExemptionComponent,
    WorkerVisitUserDetailsComponent,
    WorkerVisitAppointmentComponent,
    WorkerUserDetailsComponent,
    WorkerVisitAppointmentUserTableComponent,
    UserUpcomingComponent,
    WorkerVisitAppointmentDialogComponent,
    FreeTableComponent,
    WorkerVisitCancelComponent,
    FreeTableDialogComponent,
    UpcomingTableDialogComponent,
    WorkerDrugsComponent,
    WorkerHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatOptionModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    StatusPipe,
    DatePipe,
    DateTransformPipe,
    WorkerSpecializationPipe,
    UserApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { AssistantComponent } from './assistant/assistant.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatOptionModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { UserAssistantListComponent } from './user/user-assistant-list/user-assistant-list.component';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { UserAccountComponent } from './user/user-account/user-account.component';
import { UserVisitComponent } from './user/user-visit/user-visit.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { UserVisitActionComponent } from './user/user-visit/user-visit-action/user-visit-action.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AssistantComponent,
    DoctorComponent,
    PaginatorComponent,
    UserAssistantListComponent,
    UserHistoryComponent,
    UserAccountComponent,
    UserVisitComponent,
    UserVisitActionComponent
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
        MatProgressSpinnerModule
    ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

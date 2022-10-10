import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {UserAuthService} from "../../_services/user-auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Televisit} from "../../classes/visit/Televisit";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-user-visit',
  templateUrl: './user-visit.component.html',
  styleUrls: ['./user-visit.component.css']
})
export class UserVisitComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserService,
    private authService: UserAuthService,
    private snackBar: MatSnackBar
  ) { }

  assistantId: any;
  userId: any;
  visit: Televisit;
  visitId: string;
  view: 'START' | 'WAITING' | 'STARTED' = 'START';
  visitSubscription: Subscription;

  ngOnInit(): void {
    this.assistantId = this.route.snapshot.queryParamMap.get('assistantId');
    if (!this.assistantId){
      this.assistantId = localStorage.getItem("assistantId");
      this.visitId = localStorage.getItem('visitId');
      if (this.assistantId){
        console.log(this.assistantId + ' assistant id');
        console.log(this.visitId)
        this.userApi.getVisit(this.visitId).subscribe(value => {
          this.visit = value;
          if (this.visit.televisitStatusEnum === 'WAITING'){
            this.view = 'WAITING';
          }
          if (this.visit.televisitStatusEnum ==='ENDED'){
            localStorage.removeItem('assistantId');
            localStorage.removeItem('visitId');
          }
          if (this.visit.televisitStatusEnum === 'STARTED') {
            console.log('helo')

            this.view = 'STARTED';
          }
        })
      } else {
        this.snackBar.open("Należy ponownie wybrać asystenta", '', {
          duration: 5000,
          panelClass: ['multiline-snackbar', 'snackbarStyle']
        });
        this.router.navigate(['/assistant-list'])
      }
    }
    this.userId = this.authService.getId();

    this.getData();

    this.visitSubscription = interval(10*1000/2).subscribe(() => {
      this.getData();
      }
    );

  }

  createPhoneVisit(){
    if (this.visit){
      return
    } else {
      this.userApi.createVisit(this.assistantId, this.userId, 'PHONE').subscribe(
        value => {
          // this.templateService.setTemplate(value);
          // localStorage.setItem('templateId', JSON.stringify(value.id));
          this.visit = value;
          this.snackBar.open("Utworzono wizytę", '', {
            duration: 5000,
            panelClass: ['multiline-snackbar', 'snackbarStyle']
          });
          this.view = 'WAITING';
          localStorage.setItem('visitId', JSON.stringify(value.id));
          localStorage.setItem('assistantId', this.assistantId);
          console.log(this.visit)
        })
    }
  }

  getData():void {
    let visitId;

    if (!this.visit){
      visitId = localStorage.getItem('visitId');
    }
    if (this.visit){
      visitId = this.visit.id;
    }
    else {
      return
    }
    this.userApi.getVisit(visitId).subscribe(value => {
      this.visit = value;
      if (this.visit.televisitStatusEnum === 'STARTED') {
        this.view = 'STARTED';
      }
      if (this.visit.televisitStatusEnum === 'WAITING') {
        this.view = 'WAITING';
      }
      if (this.visit.televisitStatusEnum === 'ENDED') {
        this.visit = null;
        this.snackBar.open("Zakończono wizytę", '', {
          duration: 5000,
          panelClass: ['multiline-snackbar', 'snackbarStyle']
        });
        this.router.navigate(['/assistant-list'])
      }
      if (this.visit.televisitStatusEnum === 'REJECTED') {
        this.visit = null;
        this.snackBar.open("Wizyta odrzucona przez asystenta", '', {
          duration: 5000,
          panelClass: ['multiline-snackbar', 'snackbarStyle']
        });
        this.router.navigate(['/assistant-list'])
      }
      console.log(this.visit)
      console.log(localStorage.getItem('visitId'))
    })
  }

  ngOnDestroy(): void {
    this.visitSubscription.unsubscribe();
  }

}

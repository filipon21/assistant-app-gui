import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserApiService} from "../../_services/user-api.service";
import {UserAuthService} from "../../_services/user-auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Visit} from "../../classes/visit/Visit";
import {interval, Subscription} from "rxjs";
import {Timestamp} from "rxjs/internal-compatibility";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-visit',
  templateUrl: './user-visit.component.html',
  styleUrls: ['./user-visit.component.css']
})
export class UserVisitComponent implements OnInit, OnDestroy {
   chat: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserApiService,
    private authService: UserAuthService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
  }

  phoneNumber: string;
  assistantId: any;
  userId: any;
  visit: Visit;
  visitId: string;
  view: 'START' | 'WAITING' | 'STARTED' = 'START';
  visitSubscription: Subscription;

  ngOnInit(): void {
    this.assistantId = this.route.snapshot.queryParamMap.get('assistantId');
    this.userId = this.authService.getId();

    this.getData();

    this.visitSubscription = interval(10 * 1000 / 2).subscribe(() => {
        this.getData();
      }
    );

  }

  createPhoneVisit() {
    if (this.visit) {
      return
    } else {
      let now = Date.now();
      this.userApi.createVisit(this.assistantId, this.userId, 'PHONE',
        this.datePipe.transform(now,
          "yyyy-MM-ddTHH:mm:ss"), 'WAITING').subscribe(
        value => {
          // this.templateService.setTemplate(value);
          // localStorage.setItem('templateId', JSON.stringify(value.id));
          this.visit = value;
          this.snackBar.open("Utworzono wizytę", '', {
            duration: 5000,
            panelClass: ['multiline-snackbar', 'snackbarStyle']
          });
          this.view = 'WAITING';
          // localStorage.setItem('visitId', JSON.stringify(value.id));
          // localStorage.setItem('assistantId', this.assistantId);
        })
    }
  }

  getData(): void {

    this.userApi.getUserTelevisit(this.authService.getId()).subscribe(value => {
      if (!value && !this.assistantId) {
        this.snackBar.open("Aktualnie nie masz telewizyty lub została ona odrzucona"
          , '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['multiline-snackbar', 'error-snackbar']
          });
        this.router.navigate(['/assistant-list'])
      }
      this.visit = value;
      if (this.visit.visitStatusEnum === 'STARTED' &&
      this.visit.visitTypeEnum === 'PHONE') {
        console.log(value)
        let obj = value.users
          .find((obj => obj.roles[0].roleName !== 'USER'));

        this.phoneNumber = obj.phoneNumber;
        // this.router.navigate(['/user-current-visit'],
        //   {queryParams:{hostId: obj.id, visitId: value.id}});
        this.view = 'STARTED';
      }
      if (this.visit.visitStatusEnum === 'STARTED' &&
        this.visit.visitTypeEnum === 'CHAT') {

        this.chat = this.visit.chatLink
        window.open(this.visit.chatLink, "_blank");

        this.view = 'STARTED';
      }
      if (this.visit.visitStatusEnum === 'WAITING') {
        this.view = 'WAITING';
      }
      // if (this.visit.visitStatusEnum === 'ENDED') {
      //   this.visit = null;
      //   this.snackBar.open("Zakończono telewizytę", '', {
      //     duration: 5000,
      //     panelClass: ['multiline-snackbar', 'snackbarStyle']
      //   });
      //   this.router.navigate(['/assistant-list'])
      // }
      // if (this.visit.visitStatusEnum === 'REJECTED') {
      //   this.visit = null;
      //   this.snackBar.open("Telewizyta odrzucona przez asystenta", '', {
      //     duration: 5000,
      //     panelClass: ['multiline-snackbar', 'snackbarStyle']
      //   });
      //   this.router.navigate(['/assistant-list'])
      // }
    })
  }

  ngOnDestroy(): void {
    this.visitSubscription.unsubscribe();
  }

  createChatVisit() {
    if (this.visit) {
      return
    } else {
      let now = Date.now();
      this.userApi.createVisit(this.assistantId, this.userId, 'CHAT',
        this.datePipe.transform(now,
          "yyyy-MM-ddTHH:mm:ss"), 'WAITING').subscribe(
        value => {
          // this.templateService.setTemplate(value);
          // localStorage.setItem('templateId', JSON.stringify(value.id));
          this.visit = value;
          this.snackBar.open("Utworzono wizytę", '', {
            duration: 5000,
            panelClass: ['multiline-snackbar', 'snackbarStyle']
          });
          this.view = 'WAITING';
          // localStorage.setItem('visitId', JSON.stringify(value.id));
          // localStorage.setItem('assistantId', this.assistantId);
        })
    }
  }

  goToLink(url: any) {
    window.open(url, "_blank");
  }
}

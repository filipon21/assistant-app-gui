import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserApiService} from "../../_services/user-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserAuthService} from "../../_services/user-auth.service";
import { Visit} from "../../classes/visit/Visit";
import {DatePipe} from "@angular/common";
import {WorkerVisitUserDetailsService} from "../../_services/worker-visit-user-details.service";
import {User} from "../../classes/user/User";

@Component({
  selector: 'app-worker-visit-details',
  templateUrl: './worker-visit-details.component.html',
  styleUrls: ['./worker-visit-details.component.css']
})
export class WorkerVisitDetailsComponent implements OnInit {

  formGroup: FormGroup;
  visit: Visit;
  visitId: string;
  userTableId: string;

  displayedColumns: string[] = ['id', 'worker', 'userLastName', 'startTime', 'endTime',
    'visitTypeEnum', 'address', 'visitStatusEnum', 'actions'];
  elementId: any;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService,
    private snackBar: MatSnackBar,
    private authService: UserAuthService,
    private datePipe: DatePipe,
    private visitService: WorkerVisitUserDetailsService,

  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('visitId');
    let userTableId = this.route.snapshot.queryParamMap.get('userTableId');
    if (!id){
      this.visitId = localStorage.getItem('visitId')
      this.userTableId = localStorage.getItem('userTableId')
    } else{
      this.userTableId = userTableId;
      this.visitId = id;
    }

    this.userApiService.getVisit(this.visitId).subscribe(value => {
      this.visit = value;
      const user = value.users.filter((obj) => {
        return obj.assistant === null && obj.doctor === null;
      });
      this.user = user[0];
      console.log(value)
      this.formGroup.setValue({recommendation: value.recommendation,
        description: value.description});
    });
    this.formGroup = this.formBuilder.group({
      recommendation: [this.visit?.recommendation ?? '', [Validators.required]],
      description: [this.visit?.description ?? '', [Validators.required]],
    })
  }

  onSubmit() {
    let now = Date.now()
    if (this.formGroup.invalid){
      this.snackBar.open("Nie dodano zaleceń lub/i opisu wizyty!", '', {
        duration: 5000,
        verticalPosition: "top",
        panelClass: ['multiline-snackbar', 'error-snackbar']
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      return
    }else{
      this.userApiService.updateVisit(this.visitId, this.datePipe.transform(now, "yyyy-MM-ddTHH:mm"),
        this.formGroup.get('recommendation').value, this.formGroup.get('description').value)
        .subscribe(value => {
          this.snackBar.open("Zakończono wizytę!", '', {
            duration: 5000,
            verticalPosition: "top",
            panelClass: ['multiline-snackbar']
          });
          this.router.navigate(["/worker"])
        })
    }

  }

  onElementClick($event: string) {
    this.elementId = $event;
    this.visitService.updateApprovalMessage(this.elementId);
  }
}

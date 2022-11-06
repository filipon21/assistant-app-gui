import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {UserApiService} from "../../../_services/user-api.service";
import {Visit} from "../../../classes/visit/Visit";
import {WorkerVisitUserDetailsService} from "../../../_services/worker-visit-user-details.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-worker-visit-user-details',
  templateUrl: './worker-visit-user-details.component.html',
  styleUrls: ['./worker-visit-user-details.component.css']
})
export class WorkerVisitUserDetailsComponent implements OnInit, AfterViewChecked{

  visitId: any;

  visit: Visit;
  private sub: Subscription;

  constructor(private userApiService:UserApiService,
              private visitService: WorkerVisitUserDetailsService,
              private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    let id = this.route.snapshot.queryParamMap.get('visitId');
    if (id) {
      this.userApiService.getVisit(id).subscribe(value => {
        this.visit = value;
      });
    }
  }

  ngAfterViewChecked(): void {
    this.sub = this.visitService.currentApprovalStageMessage.subscribe(msg => {
        if(this.visitId === msg){
          return
        } else {
          this.visitId = msg
          if (this.visitId){
            this.userApiService.getVisit(this.visitId).subscribe(value => {
              this.visit = value;
            });
          }

        }
    }
    );
    this.sub.unsubscribe()
  }

  downloadPrescription() {

  }
}

import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {UserApiService} from "../../../_services/user-api.service";
import {Visit} from "../../../classes/visit/Visit";
import {WorkerVisitUserDetailsService} from "../../../_services/worker-visit-user-details.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs/operators";
import {FileService} from "../../../_services/file.service";
import {User} from "../../../classes/user/User";

/**
 * Klasa służąca do obsługi logiki związanej z danymi dotyczącymi pacjenta,
 * z którym jest wizyta
 */
@Component({
  selector: 'app-worker-visit-user-details',
  templateUrl: './worker-visit-user-details.component.html',
  styleUrls: ['./worker-visit-user-details.component.css']
})
export class WorkerVisitUserDetailsComponent implements OnInit, AfterViewChecked{

  visitId: any;
  patient: User;
  visit: Visit;
  private sub: Subscription;

  constructor(private userApiService:UserApiService,
              private visitService: WorkerVisitUserDetailsService,
              private route: ActivatedRoute,
              private fileApiService: FileService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('visitId');
    if (id) {
      this.userApiService.getVisit(id).subscribe(value => {
        this.visit = value;
        this.filterArray(value)
      });
    }
  }

  /**
   * Metoda służąca do znajdowania wizyty, jeśli zmieniono status odpowiedzi
   */
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

  filterArray(visit: Visit) {
    const user = visit.users.filter((obj) => {
      return obj.assistant === null && obj.doctor === null;
    });
    this.patient = user[0]
    return visit
  }

  /**
   * Metoda służąca do pobierania pliku z e-receptą z serwera
   */
  downloadPrescription() {
    this.fileApiService.downloadFile(this.visit.prescription.fileCode)
      .pipe(take(1))
      .subscribe((response) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([response],
          {type: this.visit.prescription.type}));

        downloadLink.download = this.visit.prescription.code;
        downloadLink.click();
      });
  }
}

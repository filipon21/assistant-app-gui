import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserApiService} from "../../../_services/user-api.service";
import {Visit} from "../../../classes/visit/Visit";
import {FileService} from "../../../_services/file.service";
import {take} from "rxjs/operators";
import {DatePipe} from "@angular/common";

/**
 * Klasa służąca do obsługi związanej z
 * komoponentem szczegółów historii dla pacjenta
 */
@Component({
  selector: 'app-user-history-details',
  templateUrl: './user-history-details.component.html',
  styleUrls: ['./user-history-details.component.css']
})
export class UserHistoryDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private fileApiService: FileService,
  ) {
  }

  visit: Visit;

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('visitId');
    if (id) {
      this.userApiService.getVisit(id).subscribe(value => {
        this.visit = this.filterArray(value)
      });
    } else {
      this.userApiService.getVisit(localStorage.getItem('visitId'))
        .subscribe(value => {
          this.visit = this.filterArray(value)
        });
    }

  }

  filterArray(visit: Visit) {
    const user = visit.users.filter((obj) => {
      return obj.assistant !== null || obj.doctor !== null;
    });
    visit.users = user
    return visit
  }

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

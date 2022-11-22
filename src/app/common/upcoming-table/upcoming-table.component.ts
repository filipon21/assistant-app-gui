import {Component, Input, OnInit} from '@angular/core';
import {VisitDetails} from "../../classes/visit/VisitDetails";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Pagination} from "../../classes/Pagination";
import {SearchQueryVisit} from "../../classes/visit/SearchQueryVisit";
import {Sort} from "../../classes/Sort";
import {interval, Subscription} from "rxjs";
import {UserApiService} from "../../_services/user-api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {debounceTime} from "rxjs/operators";
import {Visit} from "../../classes/visit/Visit";
import {VisitService} from "../../classes/visit/visit.service";
import {MatDialog} from "@angular/material/dialog";
import {UpcomingTableDialogComponent} from "./upcoming-table-dialog/upcoming-table-dialog.component";
import {VisitDecisionDialogComponent} from "./visit-decision-dialog/visit-decision-dialog.component";

@Component({
  selector: 'app-upcoming-table',
  templateUrl: './upcoming-table.component.html',
  styleUrls: ['./upcoming-table.component.css']
})
export class UpcomingTableComponent implements OnInit {

  @Input()
  ifHeaderOn: boolean;

  @Input()
  userId: string;

  @Input()
  biggerFont: boolean;

  @Input()
  displayedColumns: string[];

  @Input()
  worker: boolean;

  @Input()
  ifGoToVisitHide: boolean;

  visitTableList: VisitDetails[] = [];
  public dataSourceTable: VisitDetails[] = [];
  searchVisit: FormGroup;
  dataSource = new MatTableDataSource(this.dataSourceTable);
  pagination: Pagination = new Pagination();
  searchQuery: SearchQueryVisit;
  currentPage: number;
  maxPage: number;
  sortObject: Sort = new Sort();
  searchSubscription: Subscription;
  private sub: Subscription;

  constructor(
    private userServiceApi: UserApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private visitService: VisitService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.searchVisit = this.formBuilder.group({
      visitTypeEnum: [''],
      visitStatusEnum: [''],
      startTime: [''],
      endTime: [''],
      address: ['']
    })
    this.checkIfSearchIsClear()
    this.searchSubscription = this.searchVisit.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(() => {
      this.searchQuery = new SearchQueryVisit(this.searchVisit);
      if (this.searchQuery.startTime !== "") {
        this.searchQuery.startTime = this.datePipe.transform(this.searchQuery.startTime,
          "yyyy-MM-ddTHH:mm:ss");
      }
      if (this.searchQuery.endTime !== "") {
        this.searchQuery.endTime = this.datePipe.transform(this.searchQuery.endTime,
          "yyyy-MM-ddTHH:mm:ss");
      }

      this.pagination.page = 0;
      this.userServiceApi.getUserUpcomingVisitsWithFiltering(this.pagination, this.searchQuery,
        this.userId)
        .subscribe((res) => {
          this.dataArrayFilter(res.visitPageInfo.content)
          this.dataSourceTable = this.visitTableList;
          this.dataSource.data = this.dataSourceTable;
          this.currentPage = res.visitPageInfo.pageable.pageNumber + 1;
          this.maxPage = res.visitPageInfo.totalPages;
        });
    })
    this.userServiceApi.getUpcomingVisitList(this.pagination, this.userId).subscribe((data) => {
        this.dataArrayFilter(data.visitPageInfo.content)
        this.dataSourceTable = this.visitTableList;
        this.dataSource.data = this.dataSourceTable;
        this.currentPage = data.visitPageInfo.pageable.pageNumber + 1;
        this.maxPage = data.visitPageInfo.totalPages;

      },
      error => {
      },
    );
    this.sub = interval(60 * 1000 / 2).subscribe(() => this.getData());
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

  dataArrayFilter(array: Visit[]) {
    this.visitTableList = this.visitService.dataArrayFilter(array, this.worker)
  }

  changePage($event) {
    this.pagination.page = $event - 1;
    this.getData();
  }

  changePageSize($event) {
    this.pagination.page = 0;
    this.pagination.size = $event;
    this.getData();
  }

  sort(columnToSort: string) {
    this.sortObject.sort(columnToSort);
    this.pagination.page = 0;
    this.pagination.sortDir = this.sortObject.sortingStatus;
    this.pagination.sortParam = this.sortObject.actualSorting;
    this.getData();
  }

  getData() {
    if (this.checkIfSearchIsClear()) {
      this.userServiceApi.getUpcomingVisitList(this.pagination, this.userId)
        .subscribe((data) => {
          this.dataArrayFilter(data.visitPageInfo.content)
          this.dataSourceTable = this.visitTableList;
          this.dataSource.data = this.dataSourceTable;
          this.currentPage = data.visitPageInfo.pageable.pageNumber + 1;
          this.maxPage = data.visitPageInfo.totalPages;
        });
    } else {
      this.userServiceApi.getUserUpcomingVisitsWithFiltering
      (this.pagination, this.searchQuery, this.userId)
        .subscribe(res => {
          this.dataArrayFilter(res.visitPageInfo.content)
          this.dataSourceTable = this.visitTableList;
          this.dataSource.data = this.dataSourceTable;
          this.currentPage = res.visitPageInfo.pageable.pageNumber + 1;
          this.maxPage = res.visitPageInfo.totalPages;
        })
    }
  }

  calcOrderNumber(indexOfElement) {
    return (this.currentPage - 1) * this.pagination.size + indexOfElement + 1
  }

  checkIfSearchIsClear() {
    let val1 = this.searchVisit.get('visitTypeEnum').pristine;
    let val2 = this.searchVisit.get('visitStatusEnum').pristine;
    let val3 = this.searchVisit.get('startTime').pristine;
    let val4 = this.searchVisit.get('endTime').pristine;
    let val5 = this.searchVisit.get('address').pristine;

    return val1 || val2 || val3 || val4 || val5;
  }

  goToVisit(element) {
    localStorage.setItem('visitId', element.id);
    localStorage.setItem('userTableId', element.userTableId);
    this.router.navigate(['/worker-visit-details'],
      {queryParams: {visitId: element.id, userTableId: element.userTableId}});
  }

  rejectVisit(element) {
    this.dialog.open(VisitDecisionDialogComponent, {
      data: {visit: element, accept: false},
      width: "40%"
    })
  }

  acceptVisit(element) {
    const dialogRef = this.dialog.open(VisitDecisionDialogComponent, {
      data: {visit: element, accept: true},
      width: "40%"
    })
    dialogRef.afterClosed().subscribe((accepted) => {
      if (accepted) {
        localStorage.setItem('visitId', element.id);
        localStorage.setItem('userTableId', element.userTableId);
        this.router.navigate(['/worker-visit-details'],
          {queryParams: {visitId: element.id, userTableId: element.userTableId}});
       if (element.visitTypeEnum === 'CHAT'){
         window.open('https://assistant.zulipchat.com/', "_blank");
       }
      }
    });
  }

  cancelVisit(element) {
    var time = new Date().getTime() - new Date(element.startTime).getTime();
    if (time > -900000) {
      this.snackBar.open("Nie można odwołać wizyty 15 minut przed terminem!",
        null, {
          verticalPosition: "top",
          panelClass: "error-snackbar"
        })
    } else {

      const dialogRef = this.dialog.open(UpcomingTableDialogComponent, {
        data: {userId: this.userId, refferalId: element.refferalId, visitId: element.id},
        width: "40%"
      })
      dialogRef.afterClosed().subscribe((modified) => {
        if (modified) {
          this.getData();
        }
      });
    }
  }

  goToTelevisit(element) {

  }

  checkIfVisitStarted(startTime: string) {
    var time = new Date().getTime() - new Date(startTime).getTime();
    return time >= 0;
  }
}

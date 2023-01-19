import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VisitDetails} from "../../classes/visit/VisitDetails";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Pagination} from "../../classes/Pagination";
import {SearchQueryVisit} from "../../classes/visit/SearchQueryVisit";
import {Sort} from "../../classes/Sort";
import {Subscription} from "rxjs";
import {UserApiService} from "../../_services/user-api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {UserAuthService} from "../../_services/user-auth.service";
import {debounceTime} from "rxjs/operators";
import {Visit} from "../../classes/visit/Visit";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FreeTableDialogComponent} from "./free-table-dialog/free-table-dialog.component";
import {VisitService} from "../../classes/visit/visit.service";

/**
 * Klasa służąca do obsługi związanej z komoponentem tabeli z wolnymi wizytami
 */
@Component({
  selector: 'app-free-table',
  templateUrl: './free-table.component.html',
  styleUrls: ['./free-table.component.css']
})
export class FreeTableComponent implements OnInit {
  @Input()
  refferalId: string;

  @Input()
  specialization: string

  @Input()
  userId: string;

  @Input()
  biggerFont: boolean;

  @Input()
  displayedColumns: string[];

  @Input()
  ifWorker: boolean;

  @Input()
  isHeaderOff: boolean;

  @Input()
  userHistoryDetailsView: boolean;

  @Output()
  elementEvent = new EventEmitter<string>();

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

  ngOnInit(): void {
    this.searchVisit = this.formBuilder.group({
      visitTypeEnum: [''],
      doctorId: [''],
      visitStatusEnum: [''],
      startTime: [''],
      endTime: [''],
      address: ['']
    })

    if (!this.specialization) {
      this.specialization = localStorage.getItem('specialization')
    }

    this.findDoctor(this.specialization);

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
      this.userServiceApi.getFreeVisitsWithFiltering(this.pagination, this.searchQuery)
        .subscribe((res) => {
          this.dataArrayFilter(res.visitPageInfo.content)
          this.dataSourceTable = this.visitTableList;
          this.dataSource.data = this.dataSourceTable;
          this.currentPage = res.visitPageInfo.pageable.pageNumber + 1;
          this.maxPage = res.visitPageInfo.totalPages;
        });
    })
    this.userServiceApi.getFreeVisitList(this.pagination).subscribe((data) => {
        this.dataArrayFilter(data.visitPageInfo.content)
        this.dataSourceTable = this.visitTableList;
        this.dataSource.data = this.dataSourceTable;
        this.currentPage = data.visitPageInfo.pageable.pageNumber + 1;
        this.maxPage = data.visitPageInfo.totalPages;

      },
      error => {
      },
    );

  }

  constructor(
    private userServiceApi: UserApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private userAuthService: UserAuthService,
    private userApiService: UserApiService,
    private visitService: VisitService,
  ) {
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  dataArrayFilter(array: Visit[]) {
   this.visitTableList = this.visitService.dataArrayFilter(array, this.ifWorker)
  }

  /**
   * Metoda służąca do zmiany strony w tabeli
   */
  changePage($event) {
    this.pagination.page = $event - 1;
    this.getData();
  }

  /**
   * Metoda służąca do zmiany ilości wyświetlanych elementów w tabeli na stronę
   */
  changePageSize($event) {
    this.pagination.page = 0;
    this.pagination.size = $event;
    this.getData();
  }

  /**
   * Metoda służąca do sortowania elementów w tabeli
   */
  sort(columnToSort: string) {
    this.sortObject.sort(columnToSort);
    this.pagination.page = 0;
    this.pagination.sortDir = this.sortObject.sortingStatus;
    this.pagination.sortParam = this.sortObject.actualSorting;
    this.getData();
  }

  /**
   * Metoda służąca do wysłania zapytania na serwer o zwrot danych z listą wizyt
   */
  getData() {
    if (this.checkIfSearchIsClear()) {
      this.userServiceApi.getFreeVisitList(this.pagination).subscribe((data) => {
        this.dataArrayFilter(data.visitPageInfo.content)
        this.dataSourceTable = this.visitTableList;
        this.dataSource.data = this.dataSourceTable;
        this.currentPage = data.visitPageInfo.pageable.pageNumber + 1;
        this.maxPage = data.visitPageInfo.totalPages;
      });
    } else {
      this.userServiceApi.getFreeVisitsWithFiltering(this.pagination, this.searchQuery)
        .subscribe(res => {
          this.dataArrayFilter(res.visitPageInfo.content)
          this.dataSourceTable = this.visitTableList;
          this.dataSource.data = this.dataSourceTable;
          this.currentPage = res.visitPageInfo.pageable.pageNumber + 1;
          this.maxPage = res.visitPageInfo.totalPages;
        })
    }
  }

  /**
   * Metoda służąca do obliczania liczby porządkowej w tabeli
   */
  calcOrderNumber(indexOfElement) {
    return (this.currentPage - 1) * this.pagination.size + indexOfElement + 1
  }

  /**
   * Metoda służąca do sprawdzenia czy pola z filtracją są puste
   */
  checkIfSearchIsClear() {
    let val1 = this.searchVisit.get('visitTypeEnum').pristine;
    let val2 = this.searchVisit.get('visitStatusEnum').pristine;
    let val3 = this.searchVisit.get('startTime').pristine;
    let val4 = this.searchVisit.get('endTime').pristine;
    let val5 = this.searchVisit.get('address').pristine;

    return val1 || val2 || val3 || val4 || val5;
  }

  /**
   * Metoda służąca do otworzenia dialogu z wolnymi wiytami
   * @param element - id użytkownika
   */
  addUserToVisit(element) {
    if (this.specialization !== element.worker && element.worker !== "INTERNIST"
      && element.worker !== "ASSISTANT") {
      this.snackBar.open("Nie wybrano lekarza o specjalizacji ze skierowania!",
        null, {
          verticalPosition: "top",
          duration: 2000,
          panelClass: "error-snackbar"
        })
    } else {
      const dialogRef = this.dialog.open(FreeTableDialogComponent, {
        data: {userId: this.userId, refferalId: this.refferalId, visitId: element.id},
        width: "40%"
      })
      dialogRef.afterClosed().subscribe((modified) => {
        if (modified) {
          this.getData();
        }
      });
    }
  }

  /**
   * Metoda służąca do znalezienia id po danej specjalizacji
   * @param specialization - specjalizacaj (String)
   */
  private findDoctor(specialization: string) {
    if (specialization === 'CARDIOLOGIST') {
      this.searchVisit.patchValue({doctorId: '1'})
    }
    if (specialization === 'INTERNIST') {
      this.searchVisit.patchValue({doctorId: '2'})
    }
  }
}

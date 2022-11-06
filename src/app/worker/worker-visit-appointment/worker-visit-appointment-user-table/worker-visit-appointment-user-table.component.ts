import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VisitDetails} from "../../../classes/visit/VisitDetails";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Pagination} from "../../../classes/Pagination";
import {Sort} from "../../../classes/Sort";
import {interval, Subscription} from "rxjs";
import {UserApiService} from "../../../_services/user-api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {debounceTime} from "rxjs/operators";
import {User} from "../../../classes/user/User";
import {SearchQueryUser} from "../../../classes/user/SearchQueryUser";
import {UserAuthService} from "../../../_services/user-auth.service";

@Component({
  selector: 'app-worker-visit-appointment-user-table',
  templateUrl: './worker-visit-appointment-user-table.component.html',
  styleUrls: ['./worker-visit-appointment-user-table.component.css']
})
export class WorkerVisitAppointmentUserTableComponent implements OnInit {

  @Output()
  elementEvent = new EventEmitter<string>();

  public dataSourceTable: User[] = [];
  searchUser: FormGroup;
  dataSource = new MatTableDataSource(this.dataSourceTable);
  pagination: Pagination = new Pagination();
  searchQuery: SearchQueryUser;
  currentPage: number;
  maxPage: number;
  sortObject: Sort = new Sort();
  searchSubscription: Subscription;
  displayedColumns: string[] = ['id', 'userFirstName', 'userLastName', 'phoneNumber','pesel',
    'actions'];

  currentUserId: string;

  constructor(private userServiceApi: UserApiService,
              private router: Router,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar,
              private authService: UserAuthService
  ) {
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.searchUser = this.formBuilder.group({
      userFirstName: [''],
      userLastName: [''],
      phoneNumber: ['', [Validators.pattern(/([0-9])/i)]],
      pesel: ['']
    });

    this.searchSubscription = this.searchUser.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(() => {
      if (this.validateFilters()){
        this.searchQuery = new SearchQueryUser(this.searchUser);
        this.pagination.page = 0;
        this.userServiceApi.getUserListWithFiltering(this.pagination, this.searchQuery)
          .subscribe(res => {
          this.dataSourceTable = res.usersPage.content;
          this.dataSource.data = this.dataSourceTable;
          this.currentPage = res.usersPage.pageable.pageNumber + 1;
          this.maxPage = res.usersPage.totalPages;
        });
      }
    });
    this.userServiceApi.getUserList(this.pagination).subscribe((data) => {
      this.dataSourceTable = data.usersPage.content;
      this.dataSource.data = this.dataSourceTable;
      this.currentPage = data.usersPage.pageable.pageNumber + 1;
      this.maxPage = data.usersPage.totalPages;
    });
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

      this.userServiceApi.getUserListWithFiltering(this.pagination, this.searchQuery)
        .subscribe(res => {
        this.dataSourceTable = res.usersPage.content;
        this.dataSource.data = this.dataSourceTable;
        this.currentPage = res.usersPage.pageable.pageNumber + 1;
        this.maxPage = res.usersPage.totalPages;
      })
  }

  validateFilters() {
    let validationErrorMessage = '';
    if (!this.userFirstName.valid) {
      validationErrorMessage += 'Niepoprawne imię!\n';
    }
    if (!this.userLastName.valid) {
      validationErrorMessage += 'Niepoprawna nazwisko!\n';
    }
    if (!this.pesel.valid) {
      validationErrorMessage += 'Niepoprawny pesel!\n';
    }
    if (!this.phoneNumber.valid) {
      validationErrorMessage += 'Niepoprawny numer telefonu!\n';
    }

    if (validationErrorMessage !== '') {
      this.snackbar.open(validationErrorMessage, '', {
        duration: 5000,
        panelClass: ['multiline-snackbar', 'snackbarStyle']
      });
      return false;
    }
    return true;
  }

  clearInput(inputName: "userFirstName"|"userLastName"|"phoneNumber"|"isOnline"){
    this.searchUser.get(inputName).reset("")
  }

  get userFirstName() {
    return this.searchUser.get('userFirstName');
  }

  get userLastName(){
    return this.searchUser.get('userLastName')
  }

  get phoneNumber(){
    return this.searchUser.get('phoneNumber')
  }

  get pesel(){
    return this.searchUser.get('pesel')
  }

  calcOrderNumber(indexOfElement) {
    return (this.currentPage - 1) * this.pagination.size + indexOfElement + 1
  }

  addUserToSearch(element) {
    this.currentUserId = element.id;
    this.elementEvent.emit(element.id)
  }
}

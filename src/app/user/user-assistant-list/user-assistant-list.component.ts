import { Component, OnInit } from '@angular/core';
import {User} from "../../classes/user/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Pagination} from "../../classes/Pagination";
import {SearchQueryUser} from "../../classes/user/SearchQueryUser";
import {Sort} from "../../classes/Sort";
import {interval, Subscription} from "rxjs";
import {UserService} from "../../_services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {debounceTime} from "rxjs/operators";
import {UserAuthService} from "../../_services/user-auth.service";

@Component({
  selector: 'app-user-assistant-list',
  templateUrl: './user-assistant-list.component.html',
  styleUrls: ['./user-assistant-list.component.css']
})
export class UserAssistantListComponent implements OnInit {

  public dataSourceTable: User[] = [];
  searchUser: FormGroup;
  dataSource = new MatTableDataSource(this.dataSourceTable);
  pagination: Pagination = new Pagination();
  searchQuery: SearchQueryUser;
  currentPage: number;
  maxPage: number;
  sortObject: Sort = new Sort();
  isSearchBarVisibile = false;
  searchSubscription: Subscription;

  displayedColumns: string[] = ['id', 'userFirstName', 'userLastName', 'isOnline',
    'actions'];

  private sub: Subscription;

  constructor(private userServiceApi: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar,
              private authService: UserAuthService
  ) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.searchUser = this.formBuilder.group({
      userFirstName: [''],
      userLastName: [''],
      phoneNumber: ['', [Validators.pattern(/([0-9])/i)]],
      isOnline: ['']
    });

    this.searchSubscription = this.searchUser.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(() => {
      if (this.validateFilters()){
        this.searchQuery = new SearchQueryUser(this.searchUser);
        this.pagination.page = 0;
        this.userServiceApi.getAssistantListWithFiltering(this.pagination, this.searchQuery).subscribe(res => {
          this.dataSourceTable = res.usersPage.content;
          this.dataSource.data = this.dataSourceTable;
          this.currentPage = res.usersPage.pageable.pageNumber + 1;
          this.maxPage = res.usersPage.totalPages;
        });
      }
    });
    this.userServiceApi.getAssistantList(this.pagination).subscribe((data) => {
      this.dataSourceTable = data.usersPage.content;
      this.dataSource.data = this.dataSourceTable;
      this.currentPage = data.usersPage.pageable.pageNumber + 1;
      this.maxPage = data.usersPage.totalPages;
    });
    this.sub = interval(60*1000/2).subscribe(() => this.getData());
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
    if (!this.isSearchBarVisibile) {
      this.userServiceApi.getAssistantList(this.pagination).subscribe((data) => {
        this.dataSourceTable = data.usersPage.content;
        this.dataSource.data = this.dataSourceTable;
        this.currentPage = data.usersPage.pageable.pageNumber + 1;
        this.maxPage = data.usersPage.totalPages;
      });
    } else {
      this.userServiceApi.getAssistantListWithFiltering(this.pagination, this.searchQuery).subscribe(res => {
        this.dataSourceTable = res.usersPage.content;
        this.dataSource.data = this.dataSourceTable;
        this.currentPage = res.usersPage.pageable.pageNumber + 1;
        this.maxPage = res.usersPage.totalPages;
      })
    }
  }

  validateFilters() {
    let validationErrorMessage = '';
    if (!this.userFirstName.valid) {
      validationErrorMessage += 'Niepoprawne imię!\n';
    }
    if (!this.userLastName.valid) {
      validationErrorMessage += 'Niepoprawna nazwisko!\n';
    }
    if (!this.isOnline.valid) {
      validationErrorMessage += 'Niepoprawna dostępność!\n';
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

  get isOnline(){
    return this.searchUser.get('isOnline')
  }


  toogleSearchHeader() {
    this.isSearchBarVisibile = !this.isSearchBarVisibile;
  }

  calcOrderNumber(indexOfElement) {
    return (this.currentPage - 1) * this.pagination.size + indexOfElement + 1
  }

  goToVisit(element: any) {
    this.router.navigate(['user-visit'], {queryParams:{assistantId: element.id}});
    console.log(this.authService.getId())
    console.log(element)
  }
}

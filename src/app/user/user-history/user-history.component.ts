import { Component, OnInit } from '@angular/core';
import {Visit} from "../../classes/visit/Visit";
import {FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Pagination} from "../../classes/Pagination";
import {Sort} from "../../classes/Sort";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  public dataSourceTable: Visit[] = [];
  searchTelevisit: FormGroup;
  dataSource = new MatTableDataSource(this.dataSourceTable);
  pagination: Pagination = new Pagination();
  searchQuery: SearchQueryVisit;
  currentPage: number;
  maxPage: number;
  sortObject: Sort = new Sort();
  searchSubscription: Subscription;

  displayedColums: string[] = ['id', '']

  constructor() { }

  ngOnInit(): void {
  }

}

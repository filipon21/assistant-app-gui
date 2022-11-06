import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserApiService} from "../../../_services/user-api.service";
import {UserAuthService} from "../../../_services/user-auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Visit} from "../../../classes/visit/Visit";

@Component({
  selector: 'app-user-visit-action',
  templateUrl: './user-visit-action.component.html',
  styleUrls: ['./user-visit-action.component.css']
})
export class UserVisitActionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserApiService,
    private authService: UserAuthService,
    private snackBar: MatSnackBar
  ) {
  }

  hostId: string;
  visitId: string;
  visit: Visit;
  phoneNumber: string;

  ngOnInit(): void {
    this.hostId = this.route.snapshot.queryParamMap.get('hostId');
    this.visitId = this.route.snapshot.queryParamMap.get('visitId');
    this.userApi.getVisit(this.visitId).subscribe(value => {
      this.visit = value;
    })
    this.userApi.getUser(this.hostId).subscribe(value => {
      this.phoneNumber = value.phoneNumber;
    })
  }

}

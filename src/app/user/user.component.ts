import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

/**
 * Klasa służąca do obsługi logiki związanej z komopnentem z panelem pacjenta
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  goToList(){
    this.router.navigate(['/assistant-list'])
  }

  goToHistory() {
    this.router.navigate(['/user-history'])

  }

  goToAccount() {
    this.router.navigate(['/user-account'])
  }

  goToUpcoming() {
    this.router.navigate(['/user-upcoming'])

  }
}

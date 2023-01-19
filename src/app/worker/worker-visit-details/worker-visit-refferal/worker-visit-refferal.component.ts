import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Refferal} from "../../../classes/visit/Visit";
import {RefferalApiService} from "../../../_services/refferal-api.service";

/**
 * Klasa służąca do obsługi logiki związanej z wystawianiem skierowań
 */
@Component({
  selector: 'app-worker-visit-refferal',
  templateUrl: './worker-visit-refferal.component.html',
  styleUrls: ['./worker-visit-refferal.component.css']
})
export class WorkerVisitRefferalComponent implements OnInit {

  @Input()
  visitId: string;

  @Input()
  refferals: Refferal[];

  form: FormGroup;
  ifRefferals = false;

  constructor(private formBuilder: FormBuilder,
              private refferalApiService: RefferalApiService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      doctorSpecializationEnum: ['']
    })
  }

  /**
   * Metoda służąca do tworzenia skierowania i wysyłąnia requesta na serwer
   */
  onSubmit() {
    this.refferalApiService.createRefferal(this.visitId,
      this.form.get('doctorSpecializationEnum').value).subscribe(value => {
      this.refferals.push(value)
    })
  }

  /**
   * Metoda służąca do usuwania skierowania poprzez wysłanie zapytania delete na serwer
   * @param id - id skierowania (bazodanowe)
   */
  deleteRefferal(id: string) {
    this.refferalApiService.deleteRefferal(id).subscribe(() => {
      this.refferals = this.refferals.filter(data =>
        data.id != id);
    })
  }

  /**
   * Metoda służąca do pokazywania listy skierowań oraz ukrywania ich
   */
  showRefferals() {
    this.ifRefferals = !this.ifRefferals
  }
}

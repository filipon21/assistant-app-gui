import {Component, Input, OnInit} from '@angular/core';
import {Exemption} from "../../../classes/visit/Visit";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExemptionApiService} from "../../../_services/exemption-api.service";
import {DatePipe} from "@angular/common";

/**
 * Klasa służąca do obsługi logiki związanej z wystawianiem zwolnień
 */
@Component({
  selector: 'app-worker-visit-exemption',
  templateUrl: './worker-visit-exemption.component.html',
  styleUrls: ['./worker-visit-exemption.component.css']
})
export class WorkerVisitExemptionComponent implements OnInit {

  @Input()
  visitId: string;

  @Input()
  exemption: Exemption;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private exemptionApiService: ExemptionApiService,
              private datePipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]]
    })
  }

  /**
   * Metoda służąca do tworzenia zwolnienia i wysyłania go na serwer
   */
  onSubmit() {
    let startTime = this.form.get('startTime').value;
    let endTime = this.form.get('endTime').value;
    if(Date.parse(startTime) < Date.parse(endTime)){
      this.exemptionApiService.createExemption(this.visitId, this.datePipe.transform(startTime,"yyyy-MM-ddTHH:mm"),
        this.datePipe.transform(endTime,"yyyy-MM-ddTHH:mm")).subscribe(value => {
        this.exemption = value;
      })
    }else{
      alert('Niepoprawne daty!')
    }

  }
}

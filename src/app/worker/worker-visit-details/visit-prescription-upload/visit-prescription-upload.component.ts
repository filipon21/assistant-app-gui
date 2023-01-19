import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileService} from "../../../_services/file.service";
import {finalize, take} from "rxjs/operators";
import {HttpEventType} from "@angular/common/http";
import {Prescription} from "../../../classes/visit/Visit";

/**
 * Klasa służąca do obsługi logiki związanej z e-Receptami
 */
@Component({
  selector: 'app-visit-prescription-upload',
  templateUrl: './visit-prescription-upload.component.html',
  styleUrls: ['./visit-prescription-upload.component.css']
})
export class VisitPrescriptionUploadComponent implements OnInit {

  @Input()
  visitId:string;

  @Input()
  prescription: Prescription;

  constructor(private snackBar: MatSnackBar,
              private fileApiService: FileService
              ) {}

  ngOnInit(): void {
    this.code = this.prescription?.code;
  }

  uploadProgress: number;
  uploadSub: Subscription;
  code: any;

  /**
   * Metoda służąca do wybierania pliku z selektora plików oraz wysyłania go na serwer
   */
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png'
      && file.type !== 'application/pdf' && file.type !== 'image/x-eps'){
      alert("Załączono plik o złym typie!")
      return
    }

    let code = this.code;
    const prescriptionRequest = {
      code
    };

    if (file) {
      const blobCode = new Blob([JSON.stringify(prescriptionRequest)], {
        type: 'application/json',
      });
      const formData = new FormData();
      formData.append("file", file);
      formData.append('prescriptionRequest', blobCode);
      console.log(formData.get("file"))
        const upload$ = this.fileApiService.uploadFile(this.visitId, formData)
          .pipe(
            finalize(() => this.reset())
          );

        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        })
    }
  }

  /**
   * Metoda służąca do przerwania wysyłania pliku na serwer
   */
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  /**
   * Metoda służąca do resetowania aktualnego pliku
   */
  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  /**
   * Metoda służąca do pobierania pliku z serwera
   */
  downloadPrescription() {
    this.fileApiService.downloadFile(this.prescription.fileCode)
      .pipe(take(1))
      .subscribe((response) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([response],
          { type: this.prescription.type }));

        downloadLink.download = this.prescription.code;
        downloadLink.click();
      });
  }

}

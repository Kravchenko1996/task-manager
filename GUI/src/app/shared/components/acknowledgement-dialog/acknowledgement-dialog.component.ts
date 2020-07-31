import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-acknowledgement-dialog',
  templateUrl: './acknowledgement-dialog.component.html',
  styleUrls: ['./acknowledgement-dialog.component.scss']
})
export class AcknowledgementDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

}

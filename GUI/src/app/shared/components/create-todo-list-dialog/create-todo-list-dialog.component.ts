import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-todo-list-dialog',
  templateUrl: './create-todo-list-dialog.component.html',
  styleUrls: ['./create-todo-list-dialog.component.scss']
})
export class CreateToDoListDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<CreateToDoListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

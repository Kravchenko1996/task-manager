import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-todo-list-dialog',
  templateUrl: './create-todo-list-dialog.component.html',
  styleUrls: ['./create-todo-list-dialog.component.scss']
})
export class CreateToDoListDialogComponent implements OnInit {

  // ToDoListForm: FormGroup;

  constructor(
    // private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateToDoListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit() {
    // this.ToDoListForm = this.formBuilder.group({
    //   id: [this.data.id],
    //   name: [this.data.name, Validators.required]
    // })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // this.dialogRef.close();
    // if (this.ToDoListForm.valid) {
    //   this.dialogRef.close(this.ToDoListForm.value);
    // }
  }

}

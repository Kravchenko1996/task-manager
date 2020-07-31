import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-todo-list-dialog',
  templateUrl: './edit-todo-list-dialog.component.html',
  styleUrls: ['./edit-todo-list-dialog.component.scss']
})
export class EditToDoListDialogComponent implements OnInit {

  ToDoListForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditToDoListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    this.ToDoListForm = this.formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required]
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.ToDoListForm.valid) {
      this.dialogRef.close(this.ToDoListForm.value);
    }
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from 'src/interfaces/Note';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.scss']
})
export class EditNoteDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Note
  ) {
    this.form = this.fb.group({
      title: [data.title, Validators.required],
      content: [data.content, Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close({
      title: this.form.value.title,
      content: this.form.value.content
    })
  }

  close() {
    this.dialogRef.close();
  }

}

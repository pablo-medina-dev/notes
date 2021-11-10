import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Note } from 'src/interfaces/Note';

const EDITOR_CONFIG: AngularEditorConfig = {
  editable: true,
  spellcheck: false,
  height: 'auto',
  minHeight: '4',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'no',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Your Note',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'roboto', name: 'Roboto' },
    { class: 'monospace', name: 'Monospace' }
  ],
  customClasses: [
  ],
  uploadUrl: 'v1/image',
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['strikeThrough', 'subscript', 'superscript', 'heading', 'fontName'],
    ['fontSize', 'customClasses', 'insertImage', 'insertVideo', 'toggleEditorMode', 'insertHorizontalRule', 'link', 'unlink', 'removeFormat']
  ]
};

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.scss']
})
export class EditNoteDialogComponent implements OnInit {
  form: FormGroup;
  editorConfig = EDITOR_CONFIG;

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

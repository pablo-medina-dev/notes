import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DataService } from 'src/app/services/data.service';
import { NoteService } from 'src/app/services/note.service';

const EDITOR_CONFIG: AngularEditorConfig = {
  editable: true,
  spellcheck: false,
  height: 'auto',
  minHeight: '0',
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
  sanitize: false,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['strikeThrough', 'subscript', 'superscript', 'heading', 'fontName'],
    ['fontSize', 'customClasses', 'insertImage', 'insertVideo', 'toggleEditorMode', 'insertHorizontalRule', 'link', 'unlink', 'removeFormat']
  ]
};


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  form: FormGroup;
  editorConfig = EDITOR_CONFIG;

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router, private noteService: NoteService) {
    this.form = this.fb.group({
      id: [0],
      title: [''],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    const note = this.dataService.getNote();
    this.form = this.fb.group({
      id: [note.id],
      title: [note.title],
      content: [note.content, Validators.required]
    });
  }

  async save() {
    if (!this.form.invalid) {
      const record = {
        id: this.form.value.id,
        title: this.form.value.title,
        content: this.form.value.content
      }

      if (record.id > 0) {
        await this.noteService.updateRecord(
          {
            id: record.id,
            title: record.title,
            content: record.content
          }
        );
      } else {
        await this.noteService.createRecord(
          {
            title: record.title,
            content: record.content
          }
        );
      }
    }

    this.router.navigate(['/']);
  }

  close() {
    this.router.navigate(['/']);
  }

}

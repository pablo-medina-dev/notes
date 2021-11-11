import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NoteService } from 'src/app/services/note.service';
import { StorageService } from 'src/app/services/storage.service';
import { Note, NoteRecord } from 'src/interfaces/Note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: NoteRecord[] = [];
  private lastId = 0;

  constructor(private router: Router, private snackbar: MatSnackBar, private dataService: DataService, private noteService: NoteService) { }

  async ngOnInit() {
    await this.updateView();
  }

  async updateView() {
    return this.noteService.getNotes()
      .then(notes => {
        this.notes = [...notes];
      });
  }

  addNote() {
    const data: NoteRecord = {
      id: 0,
      title: '',
      content: ''
    }
    this.dataService.setNote(data);
    this.router.navigate(['/edit']);
  }

  editNote(noteToEdit: NoteRecord) {
    const data = {
      id: noteToEdit.id,
      title: noteToEdit.title,
      content: noteToEdit.content
    }
    this.dataService.setNote(data);
    this.router.navigate(['/edit']);
  }

  deleteNote(noteToDelete: NoteRecord) {
    this.noteService.deleteRecord(noteToDelete)
      .then(() => {
        this.updateView()
          .then(() => {
            this.showMessage('Note deleted')
          });
      });
  }

  showMessage(message: string) {
    this.snackbar.open(message, 'OK', { duration: 1500 });
  }
}

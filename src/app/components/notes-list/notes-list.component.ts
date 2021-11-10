import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { StorageService } from 'src/app/services/storage.service';
import { Note, NoteRecord } from 'src/interfaces/Note';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';

const buildRecords = (notes: Note[]): NoteRecord[] => {
  const records: NoteRecord[] = [];
  let i = 0;
  notes.forEach(note => {
    records.push({
      id: ++i,
      title: note.title,
      content: note.content
    });
  });
  return records;
}

const exportRecords = (records: NoteRecord[]): Note[] => {
  const notes: Note[] = [];
  records.forEach(record => {
    notes.push({
      title: record.title,
      content: record.content
    });
  });
  return notes;
}

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: NoteRecord[] = [];
  private lastId = 0;

  constructor(private dialog: MatDialog, private storageService: StorageService, private snackbar: MatSnackBar) { }

  async ngOnInit() {
    await this.fetchNotes();
  }

  async fetchNotes() {
    return this.storageService.getNotes()
      .then(notes => {
        this.notes = buildRecords(notes);
        this.lastId = this.notes.length + 1;
      })
  }

  async storeNotes() {
    const notes = exportRecords(this.notes);
    return this.storageService.setNotes(notes);
  }

  addNote() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: '',
      content: ''
    }

    const dialogRef = this.dialog.open(EditNoteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((newNote: NoteRecord | undefined) => {
      if (newNote) {
        this.notes.push({
          id: this.lastId++,
          title: newNote.title,
          content: newNote.content
        });
        this.storeNotes().then(() => { this.showMessage('Note added') });
      }
    });
  }

  editNote(noteToEdit: NoteRecord) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: noteToEdit.id,
      title: noteToEdit.title,
      content: noteToEdit.content
    }

    const dialogRef = this.dialog.open(EditNoteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((updatedNote: NoteRecord | undefined) => {
      if (updatedNote) {
        const noteToUpdate = this.notes.find(note => note.id === noteToEdit.id);
        if (noteToUpdate) {
          noteToUpdate.title = updatedNote.title;
          noteToUpdate.content = updatedNote.content;
          this.storeNotes().then(() => { this.showMessage('Note updated') });
        }
      }
    });
  }

  deleteNote(noteToDelete: NoteRecord) {
    const indexToDelete = this.notes.findIndex(note => note.id == noteToDelete.id);
    if (indexToDelete >= 0) {
      this.notes.splice(indexToDelete, 1);
      this.storeNotes().then(() => { this.showMessage('Note deleted') });
    }
  }

  showMessage(message: string) {
    this.snackbar.open(message, 'OK', { duration: 1500 });
  }
}

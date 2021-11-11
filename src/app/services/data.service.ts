import { Injectable } from '@angular/core';
import { NoteRecord } from 'src/interfaces/Note';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private note: NoteRecord = { id: 0, title: '', content: '' };

  constructor() { }

  public getNote() {
    return this.note;
  }

  public setNote(note: NoteRecord) {
    this.note = {
      id: note.id,
      title: note.title,
      content: note.content
    }
  }

}

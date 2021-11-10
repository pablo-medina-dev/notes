import { Injectable } from '@angular/core';
import { Note } from 'src/interfaces/Note';

const NOTES_ENTRY = 'notes';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getNotes(): Promise<Note[]> {
    const data = localStorage.getItem(NOTES_ENTRY);
    let notes: Note[] = [];
    if (data) {
      try {
        notes = JSON.parse(data);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve(notes);
  }

  public setNotes(notes: Note[]): Promise<void> {
    localStorage.setItem(NOTES_ENTRY, JSON.stringify(notes));
    return Promise.resolve();
  }
}

import { Injectable } from '@angular/core';
import { Note, NoteRecord } from 'src/interfaces/Note';
import { StorageService } from './storage.service';

const modelToView = (notes: Note[]): NoteRecord[] => {
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

const viewToModel = (records: NoteRecord[]): Note[] => {
  const notes: Note[] = [];
  records.forEach(record => {
    notes.push({
      title: record.title,
      content: record.content
    });
  });
  return notes;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private records: NoteRecord[];
  private lastId = 0;
  private loaded = false;

  constructor(private storage: StorageService) {
  }

  async getNotes(): Promise<NoteRecord[]> {
    if (!this.loaded) {
      await this.load();
      this.loaded = true;
    }
    return this.records;
  }

  async createRecord(note: Note): Promise<NoteRecord> {
    const record = {
      id: ++this.lastId,
      title: note.title,
      content: note.content
    }
    this.records.push(record);
    await this.store();
    return record;
  }

  async updateRecord(record: NoteRecord): Promise<NoteRecord | undefined> {
    const existingRecord = this.records.find(r => r.id === record.id);
    if (record) {
      existingRecord.title = record.title;
      existingRecord.content = record.content;
      await this.store();
      return existingRecord;
    }
  }

  async deleteRecord(record: NoteRecord): Promise<void> {
    const recordIndex = this.records.findIndex(r => r.id === record.id);
    if (recordIndex >= 0) {
      this.records.splice(recordIndex, 1);
      await this.store();
    }
  }

  private async load() {
    const notes = await this.storage.getNotes();
    this.records = modelToView(notes);
  }

  private async store() {
    const notes = viewToModel(this.records);
    return await this.storage.setNotes(notes);
  }

}

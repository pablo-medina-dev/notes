import { Component, OnInit } from '@angular/core';
import { Note } from 'src/interfaces/Note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [
    { title: 'Note 1', content: 'Test Note #1' },
    { title: 'Sample note', content: 'Hello' }
  ];

  constructor() { }

  ngOnInit() {
  }

  show(note: Note) {
    console.log(note);
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'edit', component: NoteDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

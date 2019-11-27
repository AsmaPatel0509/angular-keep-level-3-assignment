import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {
  notes: Array<Note>;
  note: Note;
  errMessage: string;
  constructor(private notelist: NotesService) {
    this.note = new Note();
    this.notes = [];
  }
  ngOnInit(){
    this.notelist.getNotes().subscribe(
      data => {
        console.log(data);
        this.notes = data;
      },
      error => {
        this.errMessage = error.message;
      }
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {
  note: Note = new Note();
  errMessage: string;
  notes: Array<Note> = [];

  constructor(private noteservice: NotesService) {

  }
  takeNote() {
    if (this.note.text == null || this.note.title == null) {
      this.errMessage = "Title and Text both are required fields";
    }
    this.notes.push(this.note);
    this.noteservice.addNote(this.note).subscribe(
      (data) => {
      this.notes.push(data);
    },
      error => {
        this.errMessage = error.message;
        this.notes.pop();
      });
    this.note.text = '';
    this.note.title = '';
  }
}


import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Array<Note> = [];
  note:Note;
  errMessage: string;

  constructor(private noteservice: NotesService) {
    this.note = new Note();
    this.notes = [];
  }

  ngOnInit() {
    this.noteservice.getNotes().subscribe(data => {
      this.notes = data;
    },
    error => {
      console.log(error);
      this.errMessage = error.message;
    })
  }
  
}

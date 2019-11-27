import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent{
  errMessage: string;
  note: Note = new Note();
  notes: Array<Note> = [];
  title: string;
  text: string;
  id:number;
  constructor(private notelist: NotesService) {
  }
  addNote1() {
        if (this.note.text == '' || this.note.title == '') {
          this.errMessage = "Title and Text both are required fields";
          // console.log(this.errMessage);
        }
          // this.errMessage = false;
          console.log("In addNote()");
          this.notes.push(this.note);
          this.notelist.addNote(this.note).subscribe((data) => {
          }, error => {
            this.errMessage = error.message;
            this.notes.pop();
          });
          this.note.title='';
          this.note.text='';
          // this.note = new Note();
          // console.log(this.notes);
        // console.log(this.note.text);
      }
}
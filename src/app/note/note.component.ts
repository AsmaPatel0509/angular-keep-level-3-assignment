import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  constructor(private routerservice: RouterService){}

  @Input()
  note:Note;

  editNote(){
    let noteID = this.note.id;
    this.routerservice.routeToEditNoteView(noteID);
  }
  
  ngOnInit() {
    
  }

}

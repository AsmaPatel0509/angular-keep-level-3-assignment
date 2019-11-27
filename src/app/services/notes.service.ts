import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>> = new BehaviorSubject(this.notes);
  submitMessage: string;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService){}

  fetchNotesFromServer() {
    return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers : new HttpHeaders().set(`Authorization`, `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(
      (data) => {
        this.notes=data;
        this.notesSubject.next(this.notes);
      },
      error => {
        if (error.status === 404) {
          this.submitMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
        }
        if (error.status === 403) {
          this.submitMessage = 'Unauthorized';
        }
      }
    );

  }

  getNotes(): Observable<Array<Note>> {
    return this.notesSubject;

    // return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
    //   headers : new HttpHeaders().set(`Authorization`, `Bearer ${this.authService.getToken()}`)
    // });

  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers : new HttpHeaders().set(`Authorization`, `Bearer ${this.authService.getBearerToken()}`)
    }).do((newnote)=>{
      this.notes.push(newnote);
      this.notesSubject.next(this.notes);
    });
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers : new HttpHeaders().set(`Authorization`, `Bearer ${this.authService.getBearerToken()}`)
    }).do(editNote=>{
      const note = this.notes.find(note => note.id === editNote.id);
      Object.assign(note, editNote);
      this.notesSubject.next(this.notes);
    })
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(note => note.id === noteId);
    return Object.assign({}, note);
  }
}

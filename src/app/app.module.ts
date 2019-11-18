import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent, WelcomeDialogComponent, NotesDialogComponent, AlertComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    WelcomeDialogComponent,
    NotesDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
  ],
  entryComponents: [
    AlertComponent,
    WelcomeDialogComponent,
    NotesDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

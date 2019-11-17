import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent, WelcomeDialogComponent, AlertComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    WelcomeDialogComponent
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
    WelcomeDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

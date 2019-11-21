import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {uuid} from 'uuidv4';

import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser = '';
  birdList = [];
  checkoutForm;
  state = 'ObservationList';
  latitude: any;
  longitude: any;

  selectedBirdId: any;

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog) {
    this.checkoutForm = this.formBuilder.group({
      id: '',
      name: '',
      notes: '',
      species: '',
      rarity: '',
      timestamp: ''
    });
  }


  ngOnInit() {
    this.getGeoLocation();

    const getBirdObservations = localStorage.getItem('observations');
    this.currentUser = localStorage.getItem('username');
    if (getBirdObservations) {
      this.birdList = JSON.parse(localStorage.getItem('observations'));
    } else {
      this.birdList = [];
    }

    if (!this.currentUser) {
      this.openWelcomeDialog();
    }
  }

  getGeoLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      let crd = pos.coords;
      this.latitude = crd.latitude;
      this.longitude = crd.longitude;
    }, this.error, this.options);
  }

  error(err) {
    !environment.production && console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  openWelcomeDialog() {
    this.dialog.open(WelcomeDialogComponent, {
      width: '400px',
      hasBackdrop: false,
      backdropClass: 'backdropBackground'
    });
  }

  viewNotes(notes) {
    this.dialog.open(NotesDialogComponent, {
      width: '400px',
      data: notes
    });
  }

  changeState(s) {
    this.state = s;
  }

  clearForm() {
    this.checkoutForm.reset();
  }

  editObservation(bird) {
    this.selectedBirdId = bird.id;
    this.checkoutForm.controls.name.value = bird.name;
    this.checkoutForm.controls.rarity.value = bird.rarity;
    this.checkoutForm.controls.species.value = bird.species;
    this.checkoutForm.controls.notes.value = bird.notes;
    this.checkoutForm.controls.timestamp.value = bird.timestamp;
  }

  submitForm(value) {
    let missingFields = '';
    let valid = true;
    if (!value.name) {
      valid = false;
      missingFields += ', name';
    }
    if (!value.species) {
      valid = false;
      missingFields += ', species';
    }
    if (!value.rarity) {
      valid = false;
      missingFields += ', rarity';
    }
    if (!value.notes) {
      valid = false;
      missingFields += ', notes';
    }


    if (valid) {
      if (this.state === 'ObservationFormAdd') {
        value.id = uuid();
        value.longitude = this.longitude;
        value.latitude = this.latitude;
        value.timestamp = Date.now();
        this.birdList.unshift(value);
        localStorage.setItem('observations', JSON.stringify(this.birdList));
      } else if (this.state === 'ObservationFormEdit') {
        for (let i = 0; i < this.birdList.length; i++) {

          if (this.birdList[i].id === this.selectedBirdId) {
            // Update observation location
            value.longitude = this.longitude;
            value.latitude = this.latitude;
            this.birdList[i] = value;
            localStorage.setItem('observations', JSON.stringify(this.birdList));
            break;
          }
        }
      }

      const getBirdObservations = localStorage.getItem('observations');
      this.currentUser = localStorage.getItem('username');
      if (getBirdObservations) {
        this.birdList = JSON.parse(localStorage.getItem('observations'));
      } else {
        this.birdList = [];
      }

      this.changeState('ObservationList');
    } else {
      const dialogRef = this.dialog.open(AlertComponent, {
        width: '600px',
        data: {
          title: 'Missing Fields',
          type: 'Error',
          message: 'Please insert the following field/s ' + missingFields,
          button: 'Ok'
        }
      });

      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }
}

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './dialogs/welcome-dialog.html',
  styleUrls: ['./dialogs/welcome-dialog.css']
})

export class WelcomeDialogComponent implements OnInit {

  userName = '';

  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) {
  }

  ngOnInit() {
  }

  submitName() {
    if (this.userName) {
      localStorage.setItem('username', this.userName);
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-alert',
  templateUrl: './dialogs/alert-dialog.html',
  styleUrls: ['./dialogs/alert-dialog.css']
})

export class AlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-alert',
  templateUrl: './dialogs/notes-dialog.html',
  styleUrls: ['./dialogs/notes-dialog.css']
})

export class NotesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  closeNotesDialog() {
    this.dialogRef.close();
  }
}

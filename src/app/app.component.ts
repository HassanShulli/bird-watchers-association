import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'birdObservations';
  currentUser = '';
  birdList = [];
  checkoutForm;
  state = 'ObservationList';

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      notes: '',
      species: '',
      rarity: '',
      timestamp: ''
    });
  }


  ngOnInit() {
    const getBirdObservations = localStorage.getItem('observations');
    this.currentUser = localStorage.getItem('username');
    if (getBirdObservations) {
      this.birdList = JSON.parse(localStorage.getItem('observations'));
    } else {
      this.birdList = [];
    }

    console.log('this.currentUser : ', this.currentUser);

    if (!this.currentUser) {
      this.openWelcomeDialog();
    }
    console.log('this.birdList : ', this.birdList);
    // this.birdList.push({
    //   name: 'Yellow Bird',
    //   notes: 'Healthy',
    //   rarity: 'rare'
    // }, {
    //   name: 'Grey Bird',
    //   notes: 'Grey',
    //   rarity: 'extremely rare'
    // });
  }

  //
  // const dialogRef = this.dialog.open(AlertDialogComponent, {
//     width: '700px',
//     data: {
//       title: 'Success',
//       type: 'Notification',
//       message: 'Template Uploaded',
//       button: 'Ok'
//     }
//   });
//
//   dialogRef.afterClosed().subscribe(res => {
//   this.getTemplates();
// });

  openWelcomeDialog() {
    this.dialog.open(WelcomeDialogComponent, {
      width: '400px',
      hasBackdrop: false,
      backdropClass: 'backdropBackground'
    });
  }

  changeState(s) {
    this.state = s;
  }

  clearForm() {
    this.checkoutForm.reset();
  }

  editObservation(bird) {
    console.log('bird : ', bird);
    this.checkoutForm.controls.name.value = bird.name;
    this.checkoutForm.controls.rarity.value = bird.rarity;
    this.checkoutForm.controls.species.value = bird.species;
    this.checkoutForm.controls.notes.value = bird.notes;
  }

  submitForm(value) {
    console.log('checkoutForm : ', this.checkoutForm);
    let missingFields = '';
    let valid = true;
    if (!value.name) {
      console.log('No Name');
      valid = false;
      missingFields += ', name';
    }
    if (!value.species) {
      console.log('No Species');
      valid = false;
      missingFields += ', species';
    }
    if (!value.rarity) {
      console.log('No rarity');
      valid = false;
      missingFields += ', rarity';
    }
    if (!value.notes) {
      console.log('No notes');
      valid = false;
      missingFields += ', notes';
    }

    if (valid) {
      console.log('VALID !!');
      value.timestamp = Date.now();
      this.birdList.push(value);
      localStorage.setItem('observations', JSON.stringify(this.birdList));
      console.log('value : ', value);
      this.changeState('ObservationList');
    } else {
      console.log('NOT VALID');
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
    // console.log('this.checkoutForm : ', this.checkoutForm);
    // console.log('value : ', value);
    //
    // this.birdList.push(value);
    // localStorage.setItem('observations', JSON.stringify(this.birdList));
    // console.log('value : ', value);
    // this.changeState('ObservationList');
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
    console.log('this.userName  : ', this.userName);
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
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log('this.data : ', this.data);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

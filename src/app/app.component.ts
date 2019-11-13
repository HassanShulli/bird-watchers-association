import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'birdObservations';
  birdList = [];
  checkoutForm;
  state = 'ObservationList';

  constructor(private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      notes: '',
      rarity: ''
    });
  }


  ngOnInit() {
    this.birdList.push({
      name: 'Yellow Bird',
      notes: 'Healthy',
      rarity: 'rare'
    }, {
      name: 'Grey Bird',
      notes: 'Grey',
      rarity: 'extremely rare'
    });
  }

  changeState(s) {
    this.state = s;
  }

  submitForm(value) {
    this.birdList.push(value);
    console.log('value : ', value);
  }
}

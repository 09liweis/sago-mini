import { Component } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sago  Mini  Programming  Challenge';
  bundleId = 'com.sagomini.HomeworkChallenge';
  buildNum;

  constructor(private apiService: ApiService) {}

  read() {
    this.apiService.read(this.bundleId).subscribe(data => {
      this.buildNum = data.build_number;
    });
  }

  set() {
    this.apiService.set(this.bundleId, this.buildNum).subscribe(data => {
      console.log(data);
    });
  }

  bump() {
    this.apiService.bump(this.bundleId).subscribe(data => {
      console.log(data);
    });
  }
}

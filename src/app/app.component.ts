import { Component } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bundle Identifier Tracking for Sago Mini';
  bundleId = '';
  buildNum;
  errorMsg = '';
  showError = false;
  resultMsg = '';
  showResult = false;

  constructor(private apiService: ApiService) {}

  read() {
    this.hideMsg();
    if (this.bundleId.trim() == '') {
      this.showError = true;
      this.errorMsg = 'The bundle identifier can not be empty';
      return;
    }
    this.apiService.read(this.bundleId).subscribe(data => {
      this.buildNum = data.build_number;
      this.showResult = true;
      this.resultMsg = 'The build number is ' + data.build_number;
    });
  }

  set() {
    this.hideMsg();
    if (this.bundleId.trim() == '' || this.buildNum == '') {
      this.showError = true;
      this.errorMsg = 'The bundle identifier or build number can not be empty';
      return;
    }
    this.apiService.set(this.bundleId, this.buildNum).subscribe(data => {
      this.showResult = true;
      this.resultMsg = 'The build number for ' + this.bundleId + ' is ' + this.buildNum;
    });
  }

  bump() {
    this.hideMsg();
    if (this.bundleId.trim() == '') {
      this.showError = true;
      this.errorMsg = 'The bundle identifier can not be empty';
      return;
    }
    this.apiService.bump(this.bundleId).subscribe(data => {
      this.buildNum = data.build_number;
      this.showResult = true;
      this.resultMsg = 'The build number for ' + this.bundleId + ' is ' + this.buildNum;
    });
  }

  hideMsg() {
    this.showError = false;
    this.showResult = false;
  }
}

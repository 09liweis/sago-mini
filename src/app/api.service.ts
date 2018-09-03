import { Injectable } from '@angular/core';
import { Http }    from '@angular/http';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ApiService {
  private apiDomain = 'http://localhost:3000/';
  constructor (private http: Http) {}

  read(bundle_id) {
    return this.http.get(this.apiDomain + 'api/read?bundle_id=' + bundle_id)
    .map((res) => res.json())
    .catch((err) => {
      return Observable.throw(err);
    })
  }

  set(bundle_id, new_build_number) {
    return this.http.post(this.apiDomain + 'api/set', {bundle_id: bundle_id, new_build_number: new_build_number})
    .map((res) => res.json());
  }

  bump(bundle_id) {
    return this.http.post(this.apiDomain + 'api/bump', {bundle_id: bundle_id})
    .map((res) => res.json());
  }
}

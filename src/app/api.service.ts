import { Injectable } from '@angular/core';
import { Http }    from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor (private http: Http) {}

  read(bundle_id) {
    return this.http.get('http://localhost:3000/api/read?bundle_id=' + bundle_id)
    .map((res) => res.json());
  }

  set(bundle_id, new_build_number) {
    return this.http.post('http://localhost:3000/api/set', {bundle_id: bundle_id, new_build_number: new_build_number})
    .map((res) => res.json());
  }

  bump(bundle_id) {
    return this.http.post('http://localhost:3000/api/bump', {bundle_id: bundle_id})
    .map((res) => res.json());
  }
}

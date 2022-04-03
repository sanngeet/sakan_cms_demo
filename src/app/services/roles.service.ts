import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private usersUrl = 'http://sakan.hopto.org/api/v1/cms/roles';

  constructor(private http: HttpClient) {}

  getRoles() {
    const params = {
      lang: 'en',
      countryCode: 'kw',
    };

    let response = this.http.get(this.usersUrl, { params });

    return response;
  }
}

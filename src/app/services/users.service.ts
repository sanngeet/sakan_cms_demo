import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private usersUrl = 'http://sakan.hopto.org/api/v1/cms/users/cms';

  getUsers(
    lang: string,
    countryCode: string,
    pageNumber: number,
    recordsPerPage: number,
    searchText: any,
    orderBy: any,
    hasSession: any,
    isActive: any,
    rolesCsv: any
  ) {
    const params: any = {};
    if (lang) {
      params.lang = lang;
    }
    if (countryCode) {
      params.countryCode = countryCode;
    }
    if (pageNumber) {
      params.pageNumber = pageNumber;
    }
    if (recordsPerPage) {
      params.recordsPerPage = recordsPerPage;
    }
    if (searchText) {
      params.searchText = searchText;
    }
    if (orderBy) {
      params.orderBy = orderBy;
    }
    if (hasSession) {
      params.hasSession = hasSession;
    }
    if (isActive == '1' || isActive == '0') {
      params.isActive = isActive;
    }
    if (rolesCsv) {
      params.rolesCsv = rolesCsv;
    }

    let response = this.http.get(this.usersUrl, { params });

    return response;
  }
}

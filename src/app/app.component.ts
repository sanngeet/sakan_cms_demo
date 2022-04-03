import { Component, OnInit } from '@angular/core';
import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';
import { SORT_KEYS } from './constants/sort-keys';
import { COUNTRIES } from './constants/countries';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  spinnerStatus = true;
  errorMessage: string = '';
  error: Boolean = false;

  sortKeys = SORT_KEYS;
  countries = COUNTRIES;

  selectedCountry: string = 'kw';

  lang = 'en';
  countryCode = this.selectedCountry;
  pageNumber: number = 1;
  recordsPerPage: number = 10;
  searchText: string = '';
  recordsCount: any = '';
  status: any = '';
  orderBy: any = 'date-added-desc';
  hasSession: any = '';
  isActive: any = '';
  rolesCsv: any = '';

  users = new Array<any>();
  userData = {};

  roles = new Array<any>();
  roleData = {};

  ngOnInit() {
    // get users
    this.searchUser();

    // get roles
    this.rolesService.getRoles().subscribe((data: any) => {
      this.roleData = data;
      this.roles = data.roles;
    });
  }

  title = 'Sakan Users';

  // Search user
  searchUser() {
    this.spinnerStatus = true;

    this.usersService
      .getUsers(
        this.lang,
        this.countryCode,
        this.pageNumber,
        this.recordsPerPage,
        this.searchText,
        this.orderBy,
        this.hasSession,
        this.isActive,
        this.rolesCsv
      )
      .subscribe((data: any) => {
        this.spinnerStatus = false;
        this.userData = data;
        this.recordsCount = data.recordsCount;
        if (data.users == null) {
          this.error = true;
          this.errorMessage =
            'No match found. Please change the search criterion.';
          return;
        }
        this.users = data.users;

        // Concat all the roles of each user and assign it to a new variable
        if (this.users.length) {
          this.users.forEach((element, index) => {
            if (Array.isArray(element.roles)) {
              element.roles.forEach((element2: any, index2: number) => {
                if (
                  this.users[index].rolesCsv != '' &&
                  this.users[index].rolesCsv != undefined
                ) {
                  this.users[index].rolesCsv =
                    this.users[index].rolesCsv + ',' + element2.name;
                } else {
                  this.users[index].rolesCsv = element2.name;
                }
              });
            }
          });
        }
      });
  }

  // Pagination
  pageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.searchUser();
  }

  // Filter by status
  getUsersByStatus(status: any) {
    this.isActive = status;
    this.searchUser();
  }

  // Filter by Roles
  getUsersByRoles(param: any) {
    if (param == 'all') {
      this.rolesCsv = '';
    } else {
      this.rolesCsv = param;
    }

    this.searchUser();
  }

  // Sorting
  sortUsers(param: any) {
    this.orderBy = param;
    this.searchUser();
  }

  // Change Country
  changeCountry(countryCode: any) {
    this.countryCode = countryCode;
    this.searchUser();
  }

  // Change language
  changeLanguage(lang: string) {
    this.lang = lang;
    this.searchUser();
  }

  // Close alert
  closeAlert() {
    this.errorMessage = '';
    this.error = false;
  }

  showSpinner() {
    this.spinnerStatus = true;
  }

  hideSpinner() {
    this.spinnerStatus = false;
  }
}

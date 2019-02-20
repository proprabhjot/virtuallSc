import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Authorization} from '../Interface/authorization';


@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  accessUrl = 'https://pd03.api.t-mobile.com/v2/tokens';
  accessoryUrl = 'https://pd03.api.t-mobile.com/v2/products/';
  token: any;

  constructor(private http: HttpClient) {
  }

  getToken() {
    const accessHeaders = new HttpHeaders({
      ['Content-Type']: 'application/json',
      accept: 'application/json',
      ['api-version']: 'v2',
      applicationid: 'TMO',
      channelid: 'web',
      interactionid: 'sample',
    });
    return this.http.post(this.accessUrl, {
      clientId: 'regf2J8znJpfzOZjSijG9YiWwBtJc0BO',
      grantType: 'client_credentials',
      role: 'PUBLIC',
      scope: 'raptor'
    }, {headers: accessHeaders})
      .pipe(map(
        authorization => {
          console.log('POST call successful value returned in body', authorization);
          return this.token = authorization;
        },
        response => {
          console.log('POST call in error', response);
        }));
  }

  getAccessoryData(token: Authorization) {
    const accessoryHeaders = new HttpHeaders({
      ['Content-Type']: 'application/json',
      accept: 'application/json',
      ['api-version']: 'v2',
      applicationid: 'TMO',
      channelid: 'web',
      interactionid: 'sample',
      Authorization: 'Bearer ' + token.accessToken
    });
    return this.http.post(this.accessoryUrl, {
      productType: ['ACCESSORY'],
      isDetailRequest: 'true',
      filterOptionsSelected: [{
        fieldName: 'productType',
        values: ['ACCESSORY']
      }],
      sortOptions: [{
        sortOptionValue: 'frpPrice',
        sortDirection: 'descending'
      }],
      pageSize: '300'
    }, {headers: accessoryHeaders})
      .pipe(map(
        val => {
          console.log('POST call successful value returned in body', val);
          return val;
        },
        response => {
          console.log('POST call in error', response);
        }));
  }

}

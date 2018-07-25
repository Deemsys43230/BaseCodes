import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';


const apiUrl = environment.apiUrl;
const commonUrl = environment.commonUrl;
const loginUrl = environment.loginUrl;
const uploadUrl = environment.uploadUrl;

@Injectable()
export class CoinService {

  result: any;
  constructor(private http: HttpClient) {}

  addCoin(name, price) {
    const uri = apiUrl+'/add';
    const obj = {
      name: name,
      price: price
    };
    this
      .http
      .post(uri, obj)
      .subscribe(res =>
          console.log('Done'));
  }

  getCoins() {
    const uri = apiUrl;
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

  editCoin(id) {
    const uri = apiUrl + '/edit/' + id;
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

  updateCoin(name, price, id) {
    const uri = apiUrl + '/update/' + id;

    const obj = {
      name: name,
      price: price
    };
    this
      .http
      .post(uri, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteCoin(id) {
    const uri = apiUrl + '/delete/' + id;

        return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }
  loginUser(email, password) {
    const uri = loginUrl;
    const obj = {
      email: email,
      password: password
    };
    this
      .http
      .post(uri, obj)
      .subscribe(res =>
          console.log('Done'));
  }
  uplaodFile(files) {
    const uri = uploadUrl;
    const obj = {
      files: files
    };
    this
      .http
      .post(uri, obj)
      .subscribe(res =>
          console.log('Done'));
  }
}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RmData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RmData {

  url : String = 'http://192.168.0.2';

  constructor(public http: Http) {
    console.log('Hello RmData Provider');
  }


  Api_get(data?){

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return new Promise((resolve) => {

          this.http.post( this.url + data.method, data.send ).subscribe((data) => {
                  resolve(data.json());
              },
              (error) => {
                  console.log(error);
                  let result = {error:error.json().error};
                  resolve(result)
              }
          )
      })
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrolleesService {
  api = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }

  
  //Get Enrollees
  getEnrollees() {
    return this._http
      .get('http://localhost:8080/enrollees')
      .pipe(catchError(this.handleError));
  }

  //Get Enrollee
  getEnrollee(id) {
    return this._http
      .get('http://localhost:8080/enrollees/'+id)
      .pipe(catchError(this.handleError));
  }

  //Update Enrollee
  updateEnrollee(form, id) {
    return this._http
      .put('http://localhost:8080/enrollees/'+id, form)
      .pipe(catchError(this.handleError));
  }



  //Handle Errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiResponse } from '../../interfaces/response.interface';
import { ApiRequest } from '../../interfaces/request.interface';

@Injectable()
export class ApiService {
  private static readonly API_URL = 'https://portal.organicfruitapps.com/';
  private static readonly PATH = 'programming-guides/v2/us_en-us/';

  constructor(private http: HttpClient) {}

  private formatErrors(error: HttpErrorResponse) {
    return throwError(error.status);
  }

  getData(file: string, params: HttpParams = new HttpParams()): Observable<ApiResponse> {
    return this.http.get<ApiRequest>(`${ApiService.API_URL}${ApiService.PATH}${file}`, { params }).pipe(
      map((httpResponse: any) => {
        console.table(httpResponse.featuredPlaylists.content);
        return httpResponse.featuredPlaylists.content;
      }),
      catchError((error: HttpErrorResponse) => {
        return of(this.formatErrors(error));
      })
    );
  }

}

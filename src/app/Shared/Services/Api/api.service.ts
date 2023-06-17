import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//Environments
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private authenticatedBaseUrl: string;
  private anonymousBaseUrl: string;

  constructor(private http: HttpClient) {
    this.authenticatedBaseUrl = environment.authenticatedBaseUrl;
    this.anonymousBaseUrl = environment.anonymousBaseUrl;
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.authenticatedBaseUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
  getAnonymous(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.anonymousBaseUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
  delete(path: string): Observable<any> {
    return this.http.delete(`${this.authenticatedBaseUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }
  deleteAnonymous(path: string): Observable<any> {
    return this.http.delete(`${this.anonymousBaseUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.authenticatedBaseUrl}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }
  postAnonymous(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.anonymousBaseUrl}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.authenticatedBaseUrl}${path}`,
      body
    );
  }
  putAnonymous(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.anonymousBaseUrl}${path}`,
      body
    );
  }
  // put(path: string, body: Object = {}): Observable<any> {
  //     return this.http.put(
  //         `${environment.api_url}${path}`,
  //         JSON.stringify(body)
  //     ).pipe(catchError(this.formatErrors));
  // }

  postForm(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.authenticatedBaseUrl}${path}`, body
    ).pipe(catchError(this.formatErrors));
  }
  // post(path: string, body: Object = {}): Observable<any> {
  //     return this.http.post(`${this.baseUrl}${path}`,
  //         JSON.stringify(body)
  //     ).pipe(catchError(this.formatErrors));
  // }


  postPdf(path: string, body: Object = {}): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(`${this.authenticatedBaseUrl}${path}`,
      body, { headers: headers, responseType: 'blob' }
    ).pipe(catchError(this.formatErrors));
  }

  postExcel(path: string, body: Object = {}): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/vnd.ms-excel');
    return this.http.post(`${this.authenticatedBaseUrl}${path}`,
      body, { headers: headers, responseType: 'blob' }
    ).pipe(catchError(this.formatErrors));
  }
}

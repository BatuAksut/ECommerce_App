import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

 
 private generateUrl(requestParams: Partial<RequestParams>, id?: string): string {
    if (requestParams.fullEndPoint) {
      return requestParams.fullEndPoint;
    }

    const base = requestParams.baseUrl ? requestParams.baseUrl : this.baseUrl;
    const controller = requestParams.controller;
    const action = requestParams.action;

    let url = [base, controller, action, id]
      .filter(part => part != null) 
      .map(part => part!.toString()) 
      .filter(part => part.trim() !== '')
      .join('/');

    if (requestParams.queryString) {
      url += `?${requestParams.queryString}`;
    }

    return url;
  }

  get<T>(requestParams: Partial<RequestParams>, id?: string): Observable<T> {
    const url = this.generateUrl(requestParams, id);
    return this.httpClient.get<T>(url, { headers: requestParams.headers });
  }

  post<T>(requestParams: Partial<RequestParams>, body: any): Observable<T> {
    
    const url = this.generateUrl(requestParams);
    return this.httpClient.post<T>(url, body, { headers: requestParams.headers });
  }

  put<T>(requestParams: Partial<RequestParams>, body: any): Observable<T> {

    const url = this.generateUrl(requestParams);
    return this.httpClient.put<T>(url, body, { headers: requestParams.headers });
  }

  delete<T>(requestParams: Partial<RequestParams>, id: string): Observable<T> {
    const url = this.generateUrl(requestParams, id);
    return this.httpClient.delete<T>(url, { headers: requestParams.headers });
  }
}

export class RequestParams {
  controller!: string;
  action?: string;
  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}
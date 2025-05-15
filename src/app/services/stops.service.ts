import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'; 
import { StopOBJ, StopsByDateResponse } from '../stopOBJ';

@Injectable({
  providedIn: 'root'
})

export class StopsService {
  
  constructor( private http:HttpClient ) { }

  getRouteForDay( dateTraveled : string ): Observable<StopsByDateResponse> {
    return this.http.get<any>('/server/api/v1/stops/bydate/'+dateTraveled);
  }
  
  getYears() :Observable<any> {
    return this.http.get<any>('/server/api/v1/stops/years');
  }

  getDatesForYear( year : string):Observable<any> {
    return this.http.get<any>('/server/api/v1/stops/dates/byyear/'+year);
  }
}

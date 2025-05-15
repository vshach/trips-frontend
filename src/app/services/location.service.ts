import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { LocationOBJ } from '../locationOBJ';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  //later may add cache expiry and reload every so often

  //to cache and replay the list of locations
  private locationList$: Observable<LocationOBJ []> | null = null;  

  constructor( private http:HttpClient ) { }

  getLocations() : Observable<LocationOBJ []> {
    //return this.http.get<any>('/server/api/v1/locations');
    if (!this.locationList$) {
      this.locationList$ = this.http.get<LocationOBJ []>('/server/api/v1/locations').pipe(
        shareReplay(1) // caches the latest emitted value
      );      
    }
    return this.locationList$;
  }

  //Force refresh of location list
  refreshPhotos(): void {
    this.locationList$ = null;
  }
}
